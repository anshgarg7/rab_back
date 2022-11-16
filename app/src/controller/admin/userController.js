var bcrypt = require('bcrypt');
var moment = require('moment');
const qr = require('qrcode');
const sendMail = require('../common/email');
const sendgridMail = require('../common/email');
const { encrypt, decrypt } = require('../../../helpers/crypto');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const base64 = require('base64topdf');
const fs = require('fs');
const ImagesToPDF = require('images-pdf');
const PDFDocument = require('pdfkit');

const {sequelize,DataTypes} = require('../../index');
const VendorBusinessDetails = require('../../model/vendor_business_details')(sequelize, DataTypes);
const Categories = require('../../model/categories')(sequelize, DataTypes);
const Brands = require('../../model/brands')(sequelize, DataTypes);
const HotelBusinessDetails = require('../../model/hotel_business_details')(sequelize, DataTypes);
const Referrals = require('../../model/referrals')(sequelize, DataTypes);
const Users = require('../../model/users')(sequelize, DataTypes);
const UserInterestedActivities = require('../../model/user_interested_activities')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const ActivityAdventureTypes = require('../../model/activity_adventure_types')(sequelize, DataTypes);
const AdventureActivities = require('../../model/adventure_activities')(sequelize, DataTypes);
const RentalActivities = require('../../model/rental_activities')(sequelize, DataTypes);
const ActivityPrices = require('../../model/activity_prices')(sequelize, DataTypes);
const Permissions = require('../../model/permissions')(sequelize, DataTypes);
const UserPermissions = require('../../model/user_permissions')(sequelize, DataTypes);
const Bookings = require('../../model/bookings')(sequelize, DataTypes);
const BookingReferrals = require('../../model/booking_referrals')(sequelize, DataTypes);

Users.hasMany(UserInterestedActivities, {
    foreignKey: 'user_id'
});

Users.hasOne(VendorBusinessDetails, {
    foreignKey: 'user_id'
});

Users.hasMany(Bookings, {
    foreignKey: 'user_id'
});

UserInterestedActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

AdventureActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

AdventureActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

AdventureActivities.hasMany(ActivityPrices, {
    foreignKey: 'activity_share_fk'
});

Activities.hasOne(ActivityAdventureTypes, {
    foreignKey: 'activity_id'
});

RentalActivities.hasMany(ActivityPrices, {
    foreignKey: 'activity_share_fk'
});

const RoleService = require("../../service/role");
const UserService = require("../../service/user");

const Role = new RoleService();
const User = new UserService();

const controller = {};

/********** Sub Admin **********/

/**
 * @params:      
 * @purpose:     To view Sub Admin listning
*/
controller.subAdminIndex = async (req, res) => {
    var adminRoleId = await Role.getIdByRoleName('Admin');
    var subAdmin = await User.getUserAll({ role_id: adminRoleId });
    return res.render('manageUsers/subAdmin/index', {subAdmin: subAdmin, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
}

/**
 * @params:      
 * @purpose:     To view Sub Admin create form
*/
controller.subAdminCreate = async (req, res) => {
    return res.render('manageUsers/subAdmin/create', {stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
}

/**
 * @params:      Request
 * @purpose:     To store Sub Admin
*/
controller.subAdminStore = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Admin');
            req.body.role_id = await roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = await req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.device_type = 'Web';
            req.body.status = req.body.status == undefined ? '0' : '1';
            const signUp = await User.register(req.body);
            if (!signUp.error) {
                var permissionsData = await Permissions.findAll();
                var finalPermissionsData = permissionsData?.map(v => {
                    return {
                        user_id: signUp.id,
                        permission_id: v.id,
                        slug: v.slug,
                        status: v.status
                    }
                })
                await UserPermissions.bulkCreate(finalPermissionsData);
                req.toastr.success("Sub admin added successfully.");
                return res.redirect('/admin/users/sub_admin/index');
            } else{
                req.toastr.error("User already exist.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To view Sub Admin permissions
*/
controller.subAdminPermissions = async (req, res) => {
    try{
        var data = await UserPermissions.findAll({ where: {user_id: req.params.id} }).then((val) => {
            let obj = {}
            val.forEach((v) => {
                obj[v.slug] = v.status
            })
            return obj
        });
        return res.render('manageUsers/subAdmin/permissions', {customScript: '../partials/script/permissionsForm', data, subAdminId: req.params.id});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      Request
 * @purpose:     To update sub admin permissions
*/
controller.subAdminPermissionsUpdate = async (req, res) => {
    try{
        for await (let [index, val] of req.body.slug.entries()) {
            let status = req.body.status[val] || '0';
            await UserPermissions.update({status: status}, {where: {slug: val, user_id: req.params.id}});
        }
        req.toastr.success("Permissions updated successfully.");
        return res.redirect('back');
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To view Sub Admin detail
*/
controller.subAdminView = async (req, res) => {
    var adminRoleId = await Role.getIdByRoleName('Admin');
    var subAdmin = await User.getUserOne({ id: req.params.id,  role_id: adminRoleId});
    return res.render('manageUsers/subAdmin/view', {subAdmin: subAdmin});
}

/**
 * @params:      id
 * @purpose:     To view Sub Admin edit form
*/
controller.subAdminEdit = async (req, res) => {
    var adminRoleId = await Role.getIdByRoleName('Admin');
    var subAdmin = await User.getUserOne({ id: req.params.id,  role_id: adminRoleId});
    return res.render('manageUsers/subAdmin/edit', {subAdmin: subAdmin, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
}

/**
 * @params:      Request, id
 * @purpose:     To Sub Admin update
*/
controller.subAdminUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}], $not: {id:req.params.id}});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = await req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.status = req.body.status == undefined ? '0' : '1';
            result = await User.update(req.body, {id:req.params.id});
            if (result) {
                req.toastr.success("Sub admin updated successfully.");
                return res.redirect('/admin/users/sub_admin/index');
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To Sub Admin update status
*/
controller.subAdminUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To delete Sub Admin
*/
controller.subAdminDelete = async (req, res) => {
    await User.deleteSubAdmin(req.params.id);
    return res.redirect('back');
}

/********** Vendor **********/

/**
 * @params:      
 * @purpose:     To view Vendors listning
*/
controller.vendorsIndex = async (req, res) => {
    var vendorRoleId = await Role.getIdByRoleName('Vendor');
    var vendors = await User.getVendorAll({ role_id: vendorRoleId });
    return res.render('manageUsers/vendors/index', {vendors: vendors, stackScript: '../partials/script/index', customScript: '../partials/script/vendorDiscountScript', stackLink: '../partials/link/index'});
}

/**
 * @params:      
 * @purpose:     To view Vendors Create
*/
controller.vendorsCreate = async (req, res) => {
    await Categories.findAll({where: {status: '1'}}).then(categories => {
        return res.render('manageUsers/vendors/create', {categories: categories, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request
 * @purpose:     To store Vendors
*/
controller.vendorsStore = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Vendor');
            req.body.role_id = roleId;
            req.body.is_approved = '0';
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
                if (req.files.visiting_card_image && Object.keys(req.files.visiting_card_image).length) {
                    req.body.visiting_card_image = req.files.visiting_card_image[0].filename;
                }
                if (req.files.award_certification_image && Object.keys(req.files.award_certification_image).length) {
                    req.body.award_certification_image = req.files.award_certification_image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.device_type = 'Web';
            req.body.status = req.body.status == undefined ? '0' : '1';
            const signUp = await User.register(req.body);
            if (signUp){
                let locationImageData = { image: req.body.location_image };
                let isLocationImage = await VendorBusinessDetails.findOne({where: { exact_location_name: req.body.exact_location_name }});
                if(isLocationImage){
                    var locationImage = { id: isLocationImage.location_image_id };
                } else{
                    var locationImage = await User.addVendorLocationImage(locationImageData);
                }
                if(locationImage){
                    req.body.user_id = signUp.id;
                    req.body.location_image_id = locationImage.id;
                    req.body.is_visiting_card = req.body.is_visiting_card == undefined ? '0' : '1';
                    await User.registerVendorBusinessDetail(req.body);
                    req.toastr.success("Vendor added successfully.");
                    return res.redirect('/admin/users/vendors/index');
                }
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To view Vendors view detail
*/
controller.vendorsView = async (req, res) => {
    var vendorRoleId = await Role.getIdByRoleName('Vendor');
    var vendor = await User.getVendorOne({ id: req.params.id,  role_id: vendorRoleId});
    return res.render('manageUsers/vendors/view', {vendor: vendor});
}

/**
 * @params:      id
 * @purpose:     To view Vendors edit form
*/
controller.vendorsEdit = async (req, res) => {
    try {
        var vendorRoleId = await Role.getIdByRoleName('Vendor');
        var vendor = await User.getVendorOne({ id: req.params.id,  role_id: vendorRoleId});
        var categories = await Categories.findAll({where: {status: '1'}});
        return res.render('manageUsers/vendors/edit', {categories: categories, vendor: vendor, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      Request, id
 * @purpose:     To Vendors update
*/
controller.vendorsUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}], $not: {id:req.params.id}});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else{
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
                if (req.files.visiting_card_image && Object.keys(req.files.visiting_card_image).length) {
                    req.body.visiting_card_image = req.files.visiting_card_image[0].filename;
                }
                if (req.files.award_certification_image && Object.keys(req.files.award_certification_image).length) {
                    req.body.award_certification_image = req.files.award_certification_image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.status = req.body.status == undefined ? '0' : '1';
            const result = await User.update(req.body, {id:req.params.id});
            if (result){
                let locationImageData = { image: req.body.location_image };
                let isLocationImage = await VendorBusinessDetails.findOne({where: { exact_location_name: req.body.exact_location_name }});
                if(isLocationImage){
                    var locationImage = { id: isLocationImage.location_image_id };
                } else{
                    var locationImage = await User.addVendorLocationImage(locationImageData);
                }
                if(locationImage){
                    req.body.user_id = req.params.id;
                    req.body.location_image_id = locationImage.id;
                    await User.updateVendorBusinessDetail(req.body, {user_id:req.params.id});
                    req.body.is_visiting_card = req.body.is_visiting_card == undefined ? '0' : '1';
                    req.toastr.success("Vendor update successfully.");
                    return res.redirect('/admin/users/vendors/index');
                }
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To Vendors account approved
*/
controller.vendorsIsApproved = async (req, res) => {
    let id = req.params.id;
    let isApproved = req.body.is_approved == '1' ? '0' : '1';
    await User.update({is_approved: isApproved}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To user update status
*/
controller.vendorsUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To delete user
*/
controller.vendorsDelete = async (req, res) => {
    await User.deleteVendor(req.params.id);
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To create vendor all activities discount form
*/
controller.createVendorAllActivitiesDiscount = async (req, res) => {
    try{
        var vendorRoleId = await Role.getIdByRoleName('Vendor');
        var getUser = await Users.findOne({
            where: {id: req.params.id, role_id: vendorRoleId, is_approved: '1'},
            include: [{model: VendorBusinessDetails, required: true}]
        });
        if(getUser.vendor_business_detail?.category_id == '1'){
            var adventureActivities = await AdventureActivities.findOne({attributes: ['id', 'user_id', 'discount', 'is_vendor_discount'], where: {user_id: req.params.id, is_approved: '1'}});
            return res.json({'status': true, 'adventure_activities': adventureActivities, 'category_id': getUser.vendor_business_detail?.category_id});
        } else{
            var rentalActivities = await RentalActivities.findOne({attributes: ['id', 'user_id', 'discount', 'is_vendor_discount'], where: {user_id: req.params.id, is_approved: '1'}});
            return res.json({'status': true, 'rental_activities': rentalActivities, 'category_id': getUser.vendor_business_detail?.category_id});
        }
    } catch (err) {
        return res.json({'status': false});
    }
}

/**
 * @params:      id
 * @purpose:     To store vendor all activities discount
*/
controller.storeVendorAllActivitiesDiscount = async (req, res) => {
    try{
        if(req.body.category_id == '1'){
            await AdventureActivities.update({discount: req.body.discount, is_vendor_discount: req.body.is_vendor_discount}, {where: {user_id: req.body.id, is_approved: '1'}}).then(async function (data) {
                var getData = await AdventureActivities.findAll({
                    attributes: ['id', 'discount', 'is_vendor_discount'],
                    where: {user_id: req.body.id, is_approved: '1'},
                    include: [{model: ActivityPrices, attributes: ['id', 'activity_share_fk', 'admin_amount', 'rate_type'], where: {activity_share_type: '1', rate_type: '3' } }]
                });
                for await (const [index, value] of getData.entries()) {
                    if(value?.is_vendor_discount){
                        for await (const [i, val] of value?.activity_prices.entries()) {
                            let finalAmount = val.admin_amount - (val.admin_amount * value.discount / 100);
                            await ActivityPrices.update({amount: finalAmount}, {where: {id: val.id, activity_share_fk: val.activity_share_fk, activity_share_type: '1', rate_type: val.rate_type } });
                        }
                    }
                }
                req.toastr.success("Discount added successfully.");
                return res.redirect('back');
            }).catch(err => {
                req.toastr.error("Somthing went wrong.");
                return res.redirect('back');
            }); 
        } else if(req.body.category_id == '2'){
            await RentalActivities.update({discount: req.body.discount, is_vendor_discount: req.body.is_vendor_discount}, {where: {user_id: req.body.id, is_approved: '1'}}).then(async function (data) {
                var getData = await RentalActivities.findAll({
                    attributes: ['id', 'discount', 'is_vendor_discount'],
                    where: {user_id: req.body.id, is_approved: '1'},
                    include: [{model: ActivityPrices, attributes: ['id', 'activity_share_fk', 'admin_amount', 'rate_type'], where: {activity_share_type: '2', rate_type: {$in: ['1','2']} } }]
                });
                for await (const [index, value] of getData.entries()) {
                    for await (const [i, val] of value?.activity_prices.entries()) {
                        let finalAmount = val.admin_amount - (val.admin_amount * value.discount / 100);
                        await ActivityPrices.update({amount: finalAmount}, {where: {id: val.id, activity_share_fk: val.activity_share_fk, activity_share_type: '2', rate_type: val.rate_type } });
                    }
                }
                req.toastr.success("Discount added successfully.");
                return res.redirect('back');
            }).catch(err => {
                req.toastr.error("Somthing went wrong.");
                return res.redirect('back');
            }); 
        } else{
            req.toastr.error("Somthing went wrong.");
            return res.redirect('back');
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    } 
}

/********** User **********/

/**
 * @params:      
 * @purpose:     To view Users listning
*/
controller.usersIndex = async (req, res) => {
    var userRoleId = await Role.getIdByRoleName('User');
    var users = await User.getUserAll({ role_id: userRoleId });
    return res.render('manageUsers/users/index', {users: users, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
}

/**
 * @params:      
 * @purpose:     To view Users create form 
*/
controller.usersCreate = async (req, res) => {
    return res.render('manageUsers/users/create', {stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
}

/**
 * @params:      Request
 * @purpose:     To store Users
*/
controller.usersStore = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('User');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.device_type = 'Web';
            req.body.status = req.body.status == undefined ? '0' : '1';
            const signUp = await User.register(req.body);
            if (signUp) {
                req.toastr.success("User added successfully.");
                return res.redirect('/admin/users/users/index');
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To view Users view detail
*/
controller.usersView = async (req, res) => {
    var userRoleId = await Role.getIdByRoleName('User');
    var user = await Users.findOne({ 
        attributes: {
            include: [
                [sequelize.literal('(SELECT SUM(level_points) FROM bookings WHERE bookings.user_id = users.id)'), 'total_level_points']
            ]
        },
        where: {id: req.params.id,  role_id: userRoleId},
        include: [
            {model: UserInterestedActivities, attributes: ['id'],
                include: [
                    {model: Activities, attributes: ['id', 'title', 'image'], required: true}
                ]
            }
        ]
    });
    return res.render('manageUsers/users/view', {user: user});
}

/**
 * @params:      id
 * @purpose:     To view Users edit form
*/
controller.usersEdit = async (req, res) => {
    var userRoleId = await Role.getIdByRoleName('User');
    var user = await User.getUserOne({ id: req.params.id,  role_id: userRoleId});
    return res.render('manageUsers/users/edit', {user: user, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
}

/**
 * @params:      Request, id
 * @purpose:     To Users update
*/
controller.usersUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}], $not: {id:req.params.id}});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.status = req.body.status == undefined ? '0' : '1';
            result = await User.update(req.body, {id:req.params.id});
            if (result) {
                req.toastr.success("User updated successfully.");
                return res.redirect('/admin/users/users/index');
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To user update
*/
controller.usersUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To delete user
*/
controller.usersDelete = async (req, res) => {
    await User.deleteUser(req.params.id);
    return res.redirect('back');
}

/********** Taxi Driver **********/

/**
 * @params:      
 * @purpose:     To view Taxi Drivers listning
*/
controller.taxiDriversIndex = async (req, res) => {
    var taxiDriversRoleId = await Role.getIdByRoleName('Taxi Driver');
    var taxiDrivers = await User.getUserAll({ role_id: taxiDriversRoleId });
    return res.render('manageUsers/taxiDrivers/index', {taxiDrivers: taxiDrivers, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
}

/**
 * @params:      
 * @purpose:     To view Taxi Drivers create form
*/
controller.taxiDriversCreate = async (req, res) => {
    await Brands.findAll({where: {status: '1'}}).then(brands => {
        return res.render('manageUsers/taxiDrivers/create', {brands: brands, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request
 * @purpose:     To store Taxi Drivers
*/
controller.taxiDriversStore = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Taxi Driver');
            req.body.role_id = roleId;
            req.body.is_approved = '0';
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
                if (req.files.license_fornt_image && Object.keys(req.files.license_fornt_image).length) {
                    req.body.license_fornt_image = req.files.license_fornt_image[0].filename;
                }
                if (req.files.license_back_image && Object.keys(req.files.license_back_image).length) {
                    req.body.license_back_image = req.files.license_back_image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.device_type = 'web';
            req.body.status = req.body.status == undefined ? '0' : '1';
            const signUp = await User.register(req.body);
            if (signUp) {
                req.body.user_id = signUp.id;
                req.body.license_expiry_date = moment(req.body.license_expiry_date,'DD-MM-YYYY').format('YYYY-MM-DD');
                await User.registerTaxiDriverBusinessDetail(req.body);
                req.toastr.success("Taxi driver added successfully.");
                return res.redirect('/admin/users/taxi_drivers/index');
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To view Taxi Drivers view details
*/
controller.taxiDriversView = async (req, res) => {
    var taxiDriverRoleId = await Role.getIdByRoleName('Taxi Driver');
    var taxiDriver = await User.getTaxiDriverOne({ id: req.params.id,  role_id: taxiDriverRoleId});
    return res.render('manageUsers/taxiDrivers/view', {taxiDriver: taxiDriver});
}

/**
 * @params:      id
 * @purpose:     To view Taxi Drivers edit form
*/
controller.taxiDriversEdit = async (req, res) => {
    try {
        var taxiDriverRoleId = await Role.getIdByRoleName('Taxi Driver');
        var taxiDriver = await User.getTaxiDriverOne({ id: req.params.id,  role_id: taxiDriverRoleId});
        var brands = await Brands.findAll({where: {status: '1'}});
        return res.render('manageUsers/taxiDrivers/edit', {brands: brands, taxiDriver: taxiDriver, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      Request, id
 * @purpose:     To update Taxi Drivers
*/
controller.taxiDriversUpdate = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}], $not: {id:req.params.id}});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
                if (req.files.license_fornt_image && Object.keys(req.files.license_fornt_image).length) {
                    req.body.license_fornt_image = req.files.license_fornt_image[0].filename;
                }
                if (req.files.license_back_image && Object.keys(req.files.license_back_image).length) {
                    req.body.license_back_image = req.files.license_back_image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.status = req.body.status == undefined ? '0' : '1';
            result = await User.update(req.body, {id:req.params.id});
            if (result) {
                req.body.user_id = req.params.id;
                req.body.license_expiry_date = moment(req.body.license_expiry_date,'DD-MM-YYYY').format('YYYY-MM-DD');
                await User.updateTaxiDriverBusinessDetail(req.body, {user_id:req.params.id});
                req.toastr.success("Taxi driver updated successfully.");
                return res.redirect('/admin/users/taxi_drivers/index');
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To Taxi Drivers account approved
*/
controller.taxiDriversIsApproved = async (req, res) => {
    let id = req.params.id;
    let isApproved = req.body.is_approved == '1' ? '0' : '1';
    await User.update({is_approved: isApproved}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To update Taxi Drivers status
*/
controller.taxiDriversUpdateStatus = async (req, res) => {
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: req.params.id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To delete Taxi Drivers
*/
controller.taxiDriversDelete = async (req, res) => {
    await User.deleteTaxiDriver(req.params.id);
    return res.redirect('back');
}

/********** Hotel **********/

/**
 * @params:      
 * @purpose:     To view Hotels listning
*/
controller.hotelsIndex = async (req, res) => {
    var hotelsRoleId = await Role.getIdByRoleName('Hotel');
    var hotels = await User.getUserAll({ role_id: hotelsRoleId });
    return res.render('manageUsers/hotels/index', {hotels: hotels, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
}

/**
 * @params:      
 * @purpose:     To view Hotels create form 
*/
controller.hotelsCreate = async (req, res) => {
    return res.render('manageUsers/hotels/create', {stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
}

/**
 * @params:      Request
 * @purpose:     To store Hotels
*/
controller.hotelsStore = async (req, res) => {
    try {
        var transaction = await sequelize.transaction();
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else{
            const salt = await bcrypt.genSalt();
            reqPassword = req.body.password;
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Hotel');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.device_type = 'Web';
            req.body.status = req.body.status == undefined ? '0' : '1';
            const signUp = await User.register(req.body, { transaction });
            if (signUp) {
                req.body.user_id = signUp.id;
                const HotelBusinessSignUp = await HotelBusinessDetails.create(req.body);
                if(HotelBusinessSignUp){
                    businessName = HotelBusinessSignUp.business_name;
                    req.body.user_id = signUp.id;
                    const referralsDataOrd = await Referrals.findOne({order: [['sr_no', 'DESC']]});
                    req.body.sr_no = referralsDataOrd === null ? '1' : referralsDataOrd.sr_no + 1;
                    var codeGenerate = req.body.sr_no.toString().padStart(4,'0');
                    req.body.referral_code = '#REF'+codeGenerate;
                    var referralCode = req.body.referral_code;
                    const referral_encrypt = encrypt(referralCode).content;
                    qr.toDataURL(config.FrontendUrl + 'register?referral=' + referral_encrypt + '/', async function (err, code) {
                        req.body.qr_code = code;
                        let base64String = code;
                        let base64Image = base64String.split(';base64,').pop();
                        let imgName = 'REF' + codeGenerate + Date.now() + '.' + 'png';
                        let pdfName = 'REF' + codeGenerate + Date.now();
                        fs.writeFile('public/uploadImages/qrCode/' + imgName, base64Image, { encoding: 'base64' }, function (err) {
                            const pdfDoc = new PDFDocument;
                            pdfDoc.pipe(fs.createWriteStream('public/uploadImages/qrCode/' + pdfName + '.' + 'pdf'));
                            pdfDoc.fontSize(25).fillColor('black').text('Your QR Code', { align: 'center' });
                            pdfDoc.moveDown(1.5).fontSize(15).fillColor('blue').text('Your Referral ID -' + ' ' + req.body.referral_code, { align: 'center' });
                            pdfDoc.moveDown(6.0).image('public/uploadImages/qrCode/' + imgName, { fit: [450, 150], align: 'center' });
                            pdfDoc.end();
                        });
                        await Referrals.create(req.body);
                        var mesg = '<!doctype html>' +
                            '<html>' +
                            '<head><title>Freezoner</title><meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
                            '<body>' +
                            '<div style="max-width: 100%; margin: 15px auto 15px;">' +
                            '<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: solid; border-radius: 2%; background-color: #d2f3de; margin: auto; padding:15px 0px 0;">' +
                            '<tr><td style="text-align: center">' +
                            '<img src="' + config.BASE_URL + 'assets/images/logo_dark.png" alt="img" style="width: 140px; height: auto;"/>' +
                            '</td><tr>' +
                            '<tr>' +
                            '<td>' +
                            '<table role="presentation" border="0" cellpadding="0" cellspacing="15" width="100%">' +
                            '<tr>' +
                            '<td valign="top" width="100%" style="padding-top: 20px;">' +
                            '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' +
                            '<tr>' +
                            '<td style="width:70%; padding-right: 15px;">' +
                            '<p style="font-family: "Cairo", sans-serif; font-size:20px;line-height: 40px;color:#202026; margin: 0 0 0px 20px;"> Referral Id : ' + req.body.referral_code + '</p>' +
                            '<p style="font-family: "Cairo", sans-serif; font-size:15px;line-height: 25px;color:#202026; margin: 0 0 0px 20px;"> Email : ' + req.body.email + '</p>' +
                            '<p style="font-family: "Cairo", sans-serif; font-size:15px;line-height: 25px;color:#202026; margin: 0 0 0px 20px;"> Password : ' + reqPassword + '</p>' +
                            '<p style="font-family: "Cairo", sans-serif; font-size:15px;line-height: 25px;color:#202026; margin: 0 0 0px 20px;"> Mobile : ' + req.body.country_code + ' ' + req.body.mobile_no + '</p>' +
                            '<p style="font-family: "Cairo", sans-serif; font-size:15px;line-height: 25px;color:#202026; margin: 0 0 0px 20px;"> Location : ' + req.body.location + '</p>' +
                            '</td>' +
                            '<td style="text-align: center" width="30%">' +
                            '<img src="' + config.BASE_URL + 'uploadImages/qrCode/' + imgName + '"  alt="img" style="width: 80px; height: 80px;"/>' +
                            '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>' +
                            '<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' +
                            '<tr>' +
                            '<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:15px; min-height: 100px;">' +
                            '<tr>' +
                            '<td align="" width="100%">' +
                            '<p style="font-family: "Cairo", sans-serif; color: rgb(0, 0, 0); font-size:16px;line-height: 24px;margin: 0 0 0px 20px;"> Thanks & Regards !</p>' +
                            '<p style="font-family: "Cairo", sans-serif; color: rgb(0, 0, 0); font-size:16px;line-height: 24px;margin: 0 0 30px 20px;"> Tripperpedia</p>' +
                            '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</tr>' +
                            '</table>' +
                            '</td>' +
                            '</tr>' +
                            '</table>' +
                            '</div>' +
                            '</body>' +
                            '</html>';
                        // var pathToAttachment = 'public/uploadImages/qrCode/'+pdfName+'.'+'pdf';
                        // var attachment1 = fs.readFileSync(pathToAttachment).toString("base64");
                        // var attachments = [{ filename: pdfName + '.' + 'pdf', content: attachment1, type: 'application/pdf', disposition: 'attachment' }];
                        await sendgridMail.sendgridEmailSend(req.body.email, config.ADMIN_NAME + '<' + config.ADMIN_EMAIL + '>', 'New Account', mesg, [], async function (response) {
                            if (response) {
                                req.toastr.success("Hotel added successfully.");
                                return res.redirect('/admin/users/hotels/index');
                            } else {
                                req.toastr.error("Email not send.");
                                return res.redirect('back');
                            }
                        });
                    });
                } else{
                    req.toastr.error("Internal server error.");
                    return res.redirect('back');
                }   
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To view Hotels view details
*/
controller.hotelsView = async (req, res) => {
    var hotelRoleId = await Role.getIdByRoleName('Hotel');
    var hotel = await User.getHotelOne({ id: req.params.id, role_id: hotelRoleId});
    var referralsCount = await BookingReferrals.count({ where: { hotel_id: req.decoded_data.id, status: {$in:['0','1']} } });
    var activeReferralsCount = await BookingReferrals.count({ where: { hotel_id: req.decoded_data.id, status: '1' } });
    Object.assign(hotel.dataValues, {referrals_count: referralsCount, active_referrals_count: activeReferralsCount});
    return res.render('manageUsers/hotels/view', {hotel: hotel});
}

/**
 * @params:      id
 * @purpose:     To view Hotels edit form
*/
controller.hotelsEdit = async (req, res) => {
    var hotelRoleId = await Role.getIdByRoleName('Hotel');
    var hotel = await User.getHotelOne({ id: req.params.id,  role_id: hotelRoleId});
    return res.render('manageUsers/hotels/edit', {hotel: hotel, stackScript: '../partials/script/userForm', customScript: '../partials/script/userCustomScript', stackLink: '../partials/link/userForm'});
}

/**
 * @params:      Request, id
 * @purpose:     To Hotels update
*/
controller.hotelsUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}], $not: {id:req.params.id}});
        if (isUser && Object.keys(isUser).length) {
            req.toastr.error("User already exist.");
            return res.redirect('back');
        } else{
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            req.body.status = req.body.status == undefined ? '0' : '1';
            const result = await User.update(req.body, {id:req.params.id});
            if (result){
                req.body.user_id = req.params.id;
                await HotelBusinessDetails.update(req.body, {where:{user_id:req.params.id}});
                req.toastr.success("Hotel update successfully.");
                return res.redirect('/admin/users/hotels/index');
            } else{
                req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To hotels update status
*/
controller.hotelsUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To delete hotels
*/
controller.hotelsDelete = async (req, res) => {
    await User.deleteHotel(req.params.id);
    return res.redirect('back');
}

module.exports = controller;