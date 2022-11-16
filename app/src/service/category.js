const { sequelize, DataTypes } = require('../index');
const Categories = require('../model/categories')(sequelize, DataTypes);

class categoryService {

    getCategory() {
        return new Promise((resolve, reject) => {
            return Categories.findAll({ attributes: ['id', 'title'], where: { status: { $eq: '1' } }, order: [['id', 'DESC']] }).then(res => {
                return resolve(res)
            }).catch(err => {
                return reject(err);
            });
        });
    }

    firstCategoryId() {
        return new Promise((resolve, reject) => {
            return Categories.findOne({ attributes: ['id'] })
                .then(u => {
                    return resolve(u.id);
                }).catch(err => {
                    return reject(err);
                });
        });
    }
}
module.exports = categoryService;