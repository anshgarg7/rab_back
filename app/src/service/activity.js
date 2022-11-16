const { sequelize, DataTypes } = require('../index');
const Activity = require('../model/activities')(sequelize, DataTypes);
const Category = require('../model/categories')(sequelize, DataTypes);
const ActivityAddOns = require('../model/activity_addons')(sequelize, DataTypes);
const Comments = require('../model/comments')(sequelize, DataTypes);
const ActivityListDate = require('../model/activity_list_dates')(sequelize, DataTypes);
const ActivityOther = require('../model/activity_other')(sequelize, DataTypes);

const activityCategory = Activity.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

const otherModel = Activity.hasOne(ActivityOther, {
    foreignKey: 'activity_id',
    as: 'otherDetails',
});

const listDates = Activity.hasMany(ActivityListDate, {
    foreignKey: 'activity_id',
    as: 'dates'
});

const addOns = Activity.hasMany(ActivityAddOns, {
    foreignKey: 'activity_id',
    as: 'addOns'
});


Activity.hasMany(Comments, {
    foreignKey: 'activity_id'
});

class ActivityService {

    getOne(param) {
        return new Promise((resolve, reject) => {
            return Activity.findOne({ where: param })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    getByAttr(param) {
        return new Promise((resolve, reject) => {
            return Activity.findOne({ where: param, attributes: ['id', 'h_images', 'v_images', 'services', 'item_take'] })
                .then(u => {
                    console.log(u);
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    update(body, condition) {
        return Activity.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    getById(param) {
        return new Promise((resolve, reject) => {
            return Activity.findOne({
                where: param, include: [{ model: Category, as: 'category' },
                { model: ActivityListDate, as: 'dates', attributes: ['start', 'end'] },
                { model: ActivityOther, as: 'otherDetails' },
                { model: ActivityAddOns, as: 'addOns', attributes: ['id', 'item', 'price'] },
                { model: Comments, order: [['id', 'desc']], limit: 20 }
                ]
            })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    getAll(param) {
        return new Promise((resolve, reject) => {
            return Activity.findAll({
                where: param, include: [{ model: Category, as: 'category' },
                { model: ActivityListDate, as: 'dates', attributes: ['start', 'end'] },
                { model: ActivityOther, as: 'otherDetails' },
                { model: ActivityAddOns, as: 'addOns', attributes: ['id', 'item', 'price'] },
                { model: Comments, order: [['id', 'desc']], limit: 20 }
                ]
            })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    register(body) {
        return new Promise((resolve, reject) => {
            return Activity.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return Activity.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            return Activity.destroy({
                where: {
                    id: id
                }
                // truncate: true /* this will ignore where and truncate the table instead */
            }).then(async u => {
                if (u) {
                    await ActivityListDate.destroy({ where: { activity_id: id } });
                    await ActivityAddOns.destroy({ where: { activity_id: id } });
                    await Comments.destroy({ where: { activity_id: id } });
                    await ActivityOther.destroy({ where: { activity_id: id } });

                }
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

}
module.exports = ActivityService;