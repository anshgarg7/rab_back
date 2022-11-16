const {sequelize,DataTypes} = require('../../index');
const Categories = require('../../model/categories')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const ActivityAdventureTypes = require('../../model/activity_adventure_types')(sequelize, DataTypes);
const Brands = require('../../model/brands')(sequelize, DataTypes);
const BrandVehicleTypes = require('../../model/brand_vehicle_types')(sequelize, DataTypes);
const Models = require('../../model/models')(sequelize, DataTypes);

Activities.belongsTo(Categories, {
    foreignKey: 'category_id'
});

Activities.hasMany(ActivityAdventureTypes, {
    foreignKey: 'activity_id'
});

ActivityAdventureTypes.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

BrandVehicleTypes.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

Activities.hasMany(BrandVehicleTypes, {
    foreignKey: 'activity_id'
});

BrandVehicleTypes.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

Brands.hasMany(Models, {
    foreignKey: 'brand_id'
});

const controller = {};

/********** Categories **********/

/**
 * @params:      
 * @purpose:     To view Categories listning
*/
controller.categoriesIndex = async (req, res) => {
    await Categories.findAll().then(data => {
        return res.render('manageCategories/index', {data: data, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view categories detail
*/
controller.categoriesView = async (req, res) => {
    await Categories.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('manageCategories/view', {data: data});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To categories update status
*/
controller.categoriesUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await Categories.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

/********** Activities (Adventure) **********/

/**
 * @params:      
 * @purpose:     To view Activities (Adventure) listning
*/
controller.activitiesAdventureIndex = async (req, res) => {
    try {
        var activities = await Activities.findAll({where:{category_id: 1}, order: [['id', 'DESC']], include:[{model:Categories}]});
        return res.render('manageActivities/adventure/index', {activities: activities, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      
 * @purpose:     To view Activities (Adventure) Create
*/
controller.activitiesAdventureCreate = async (req, res) => {
    var categories = await Categories.findAll({where:{id: 1, status: '1'}});
    return res.render('manageActivities/adventure/create', {categories: categories, stackScript: '../partials/script/activityForm'});
}

/**
 * @params:      Request
 * @purpose:     To store Activities (Adventure)
*/
controller.activitiesAdventureStore = async (req, res) => {
    if (req.files && Object.keys(req.files).length) {
        if (req.files.image && Object.keys(req.files.image).length) {
          req.body.image = await req.files.image[0].filename;
        }
    }
    await Activities.create(req.body).then(data => {
        req.toastr.success("Activity added successfully.");
        return res.redirect('/admin/activities_adventure/index');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view Activities (Adventure) detail
*/
controller.activitiesAdventureView = async (req, res) => {
    await Activities.findOne({where: {id: req.params.id}, include:[{model: ActivityAdventureTypes, include: [{model: Activities}] }] }).then(data => {
        return res.render('manageActivities/adventure/view', {data: data, stackScript: '../partials/script/index', stackLink: '../partials/link/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view (Adventure) activity type create form
*/
controller.activitiesAdventureCreateActivityType = async (req, res) => {
    return res.render('manageActivities/adventure/createActivityType', {activityId: req.params.id, stackScript: '../partials/script/activityForm'});
}

/**
 * @params:      Request
 * @purpose:     To store (Adventure) activity type
*/
controller.activitiesAdventureStoteActivityType = async (req, res) => {
    await ActivityAdventureTypes.create(req.body).then(data => {
        req.toastr.success("Activity type added successfully.");
        return res.redirect('/admin/activities_adventure/view/'+req.body.activity_id);
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view Activities (Adventure) activity type edit form
*/
controller.activitiesAdventureEditActivityType = async (req, res) => {
    await ActivityAdventureTypes.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('manageActivities/adventure/editActivityType', {data: data, stackScript: '../partials/script/activityForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To update Activities (Adventure) activity type
*/
controller.activitiesAdventureUpdateActivityType = async (req, res) => {
    req.body.status = req.body.status == undefined ? '0' : '1';
    await ActivityAdventureTypes.update(req.body, {where: {id: req.params.id}}).then(data => {
        req.toastr.success("Activity type updated successfully.");
        return res.redirect('/admin/activities_adventure/view/'+req.body.activity_id);
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Adventure) activity type update status
*/
controller.activitiesAdventureUpdateActivityTypeStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await ActivityAdventureTypes.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To view Activities (Adventure) edit form
*/
controller.activitiesAdventureEdit = async (req, res) => {
    var categories = await Categories.findAll({where:{id: 1, status: '1'}});
    await Activities.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('manageActivities/adventure/edit', {categories: categories, data: data, stackScript: '../partials/script/activityForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Adventure) update
*/
controller.activitiesAdventureUpdate = async (req, res) => {
    let id = req.params.id;
    req.body.status = req.body.status == undefined ? '0' : '1';
    if (req.files && Object.keys(req.files).length) {
        if (req.files.image && Object.keys(req.files.image).length) {
          req.body.image = await req.files.image[0].filename;
        }
    }
    await Activities.update(req.body, {where: {id: id}}).then(data => {
        req.toastr.success("Activity updated successfully.");
        return res.redirect('/admin/activities_adventure/index');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Adventure) update status
*/
controller.activitiesAdventureUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await Activities.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

/********** Activities (Rental) **********/

/**
 * @params:      
 * @purpose:     To view Activities (Rental) listning
*/
controller.activitiesRentalIndex = async (req, res) => {
    try {
        var activities = await Activities.findAll({where:{category_id: 2}, order: [['id', 'DESC']], include:[{model:Categories}]});
        return res.render('manageActivities/rental/index', {activities: activities, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      
 * @purpose:     To view Activities (Rental) Create
*/
controller.activitiesRentalCreate = async (req, res) => {
    var categories = await Categories.findAll({where:{id: 2, status: '1'}});
    return res.render('manageActivities/rental/create', {categories: categories, stackScript: '../partials/script/activityForm'});
}

/**
 * @params:      Request
 * @purpose:     To store Activities (Rental)
*/
controller.activitiesRentalStore = async (req, res) => {
    if (req.files && Object.keys(req.files).length) {
        if (req.files.image && Object.keys(req.files.image).length) {
          req.body.image = await req.files.image[0].filename;
        }
    }
    await Activities.create(req.body).then(data => {
        req.toastr.success("Activity added successfully.");
        return res.redirect('/admin/activities_rental/index');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view Activities (Rental) detail
*/
controller.activitiesRentalView = async (req, res) => {
    await Activities.findOne({
            where: {id: req.params.id}, 
            include:[{
                model: BrandVehicleTypes, 
                include: [{model: Brands}, {model: Activities}] 
            }]
        }).then(data => {
        return res.render('manageActivities/rental/view', {data: data, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Rental) brand update status
*/
controller.activitiesRentalUpdateBrandStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await Brands.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To view Activities (Rental) brand view
*/
controller.activitiesRentalBrandView = async (req, res) => {
    await Brands.findOne({where: {id: req.params.brand_id}, include:[{model: Models}] }).then(data => {
        console.log(data);
        return res.render('manageActivities/rental/brandView', {data: data, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Rental) brand update status
*/
controller.activitiesRentalUpdateModelStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await Models.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To view Activities (Rental) edit form
*/
controller.activitiesRentalEdit = async (req, res) => {
    var categories = await Categories.findAll({where:{id: 2, status: '1'}});
    await Activities.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('manageActivities/rental/edit', {categories: categories,data: data, stackScript: '../partials/script/activityForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Rental) update
*/
controller.activitiesRentalUpdate = async (req, res) => {
    let id = req.params.id;
    req.body.status = req.body.status == undefined ? '0' : '1';
    if (req.files && Object.keys(req.files).length) {
        if (req.files.image && Object.keys(req.files.image).length) {
          req.body.image = await req.files.image[0].filename;
        }
    }
    await Activities.update(req.body, {where: {id: id}}).then(data => {
        req.toastr.success("Activity updated successfully.");
        return res.redirect('/admin/activities_rental/index');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To Activities (Rental) update status
*/
controller.activitiesRentalUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await Activities.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

module.exports = controller;