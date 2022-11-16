const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
var moment = require('moment');
const twilio = require('twilio');
const client = new twilio(config.TwilioAccountSid, config.TwilioAuthToken);
const { validationResult } = require('express-validator');

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const PasswordResets = require('../../model/password_resets')(sequelize, DataTypes);
const Brands = require('../../model/brands')(sequelize, DataTypes);
const BrandVehicleTypes = require('../../model/brand_vehicle_types')(sequelize, DataTypes);
const Models = require('../../model/models')(sequelize, DataTypes);
const PrivacyPolicies = require('../../model/privacy_policies')(sequelize, DataTypes);
const TermConditions = require('../../model/term_conditions')(sequelize, DataTypes);
const ContactUs = require('../../model/contact_us')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const UserService = require("../../service/user");
const CategoryService = require("../../service/category");

const Role = new RoleService();
const User = new UserService();
const Category = new CategoryService();

Brands.hasMany(BrandVehicleTypes, {
    foreignKey: 'brand_id'
});

BrandVehicleTypes.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

const controller = {};

/**
 * @params:      Request
 * @purpose:     To get categories
*/
controller.categories = async (req, res) => {
    try{
        const categories = await Category.getCategory()
        return res.status(200).json({
            status: 200,
            data: categories,
            message: 'Categories fetch successfully.',
            error: null,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      Request
 * @purpose:     To vendor/user reset password
*/
controller.resetPassword = async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var extractedErrors = errors.array({ onlyFirstError: true });
            return res.status(200).json({
                status: 400,
                data: null,
                message: extractedErrors[0].msg,
                error: true,
            });
        }
        const isVendor = await PasswordResets.findOne({where: {token: req.params.security_token}});
        if(isVendor && Object.keys(isVendor).length){
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            await User.update({password: req.body.password}, {email: isVendor.email}).then(data => {
                PasswordResets.destroy({where: {email: isVendor.email, token: req.params.security_token}});
                return res.status(200).json({
                    status: 200,
                    data: null,
                    message: 'Password updated successfully.',
                    error: null,
                });
            }).catch(err => {
                return res.status(500).json({
                    status: 500,
                    data: null,
                    message: 'Somthing went wrong.',
                    error: err,
                });
            });
        } else{
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Your link has been expired.'
            });
        } 
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }  
}

/**
 * @params:      Request
 * @purpose:     To get my Profile
*/
controller.getMyProfile = async (req, res) => {
    try{
        if(req.decoded_data.role_id == '3'){
            var getUp = await User.getVendorOne({id: req.decoded_data.id});
            return res.status(200).json({
                status: 200,
                data: {
                    first_name: getUp.first_name,
                    last_name: getUp.last_name,
                    email: getUp.email,
                    country_iso: getUp.country_iso,
                    country_code: getUp.country_code,
                    mobile_no: getUp.mobile_no,
                    gender: getUp.gender,
                    dob: getUp.dob,
                    country: getUp.country,
                    state: getUp.state,
                    city: getUp.city,
                    address: getUp.address,
                    pin_code: getUp.pin_code,
                    landmark: getUp.landmark,
                    image: getUp.image,
                    is_otp_verified: getUp.is_otp_verified,
                    vendor_business_detail: getUp.vendor_business_detail,
                },
                message: 'Profile fetch successfully.',
                error: null,
            });
        }else if(req.decoded_data.role_id == '5'){
            var getUp = await User.getTaxiDriverOne({id: req.decoded_data.id});
            return res.status(200).json({
                status: 200,
                data: {
                    first_name: getUp.first_name,
                    last_name: getUp.last_name,
                    email: getUp.email,
                    country_iso: getUp.country_iso,
                    country_code: getUp.country_code,
                    mobile_no: getUp.mobile_no,
                    gender: getUp.gender,
                    dob: getUp.dob,
                    country: getUp.country,
                    state: getUp.state,
                    city: getUp.city,
                    address: getUp.address,
                    pin_code: getUp.pin_code,
                    landmark: getUp.landmark,
                    image: getUp.image,
                    is_otp_verified: getUp.is_otp_verified,
                    taxi_driver_business_detail: getUp.taxi_driver_business_detail,
                },
                message: 'Profile fetch successfully.',
                error: null,
            });
        }else if(req.decoded_data.role_id == '6'){
            var getUp = await User.getHotelOne({id: req.decoded_data.id});
            return res.status(200).json({
                status: 200,
                data: {
                    first_name: getUp.first_name,
                    last_name: getUp.last_name,
                    email: getUp.email,
                    country_iso: getUp.country_iso,
                    country_code: getUp.country_code,
                    mobile_no: getUp.mobile_no,
                    gender: getUp.gender,
                    dob: getUp.dob,
                    country: getUp.country,
                    state: getUp.state,
                    city: getUp.city,
                    address: getUp.address,
                    pin_code: getUp.pin_code,
                    landmark: getUp.landmark,
                    image: getUp.image,
                    is_otp_verified: getUp.is_otp_verified,
                    hotel_business_detail: getUp.hotel_business_detail,
                },
                message: 'Profile fetch successfully.',
                error: null,
            });
        }else{
            var getUp = await User.getUserOne({id: req.decoded_data.id});
            return res.status(200).json({
                status: 200,
                data: {
                    first_name: getUp.first_name,
                    last_name: getUp.last_name,
                    email: getUp.email,
                    country_iso: getUp.country_iso,
                    country_code: getUp.country_code,
                    mobile_no: getUp.mobile_no,
                    gender: getUp.gender,
                    dob: getUp.dob,
                    country: getUp.country,
                    state: getUp.state,
                    city: getUp.city,
                    address: getUp.address,
                    pin_code: getUp.country,
                    landmark: getUp.landmark,
                    image: getUp.image,
                    is_otp_verified: getUp.is_otp_verified,
                },
                message: 'Profile fetch successfully.',
                error: null,
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      Request
 * @purpose:     To vendor/user update profile
*/
controller.updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var extractedErrors = errors.array({ onlyFirstError: true });
            return res.status(200).json({
                status: 400,
                data: null,
                message: extractedErrors[0].msg,
                error: true,
            });
        }
        var isUserExistMobile = await User.checkUserExist({$or: [{mobile_no:req.body.mobile_no}], $not: {id:req.decoded_data.id}});
        if(isUserExistMobile && Object.keys(isUserExistMobile).length){
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Mobile already exists.',
                error: true,
            });
        } else{
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                    req.body.image = await req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            if(req.body.mobile_no != req.decoded_data.mobile_no){
                const otpGenerate = Math.floor(1000 + Math.random() * 9000);
                req.body.otp = otpGenerate;
                req.body.is_otp_verified = '0';
                await client.messages.create({
                    body: otpGenerate,
                    to: '+918628988200',
                    from: '+16066128033',
                });
            }
            const result = await User.update(req.body, {id: req.decoded_data.id});
            if (result){
                var data = await Users.findOne({where: {id: req.decoded_data.id}});
                return res.status(200).json({
                    status: 200,
                    data: {is_otp_verified: data.is_otp_verified },
                    message: 'User profile updated successfully.',
                    error: null,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    } 
}

/**
 * @params:      Request
 * @purpose:     To vendor/user change password
*/
controller.changePassword = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            var extractedErrors = errors.array({ onlyFirstError: true });
            return res.status(200).json({
                status: 400,
                data: null,
                message: extractedErrors[0].msg,
                error: true,
            });
        }
        const match = await bcrypt.compare(req.body.old_password, req.decoded_data.password);
        if (match) {
            const matchPassword = await bcrypt.compare(req.body.new_password, req.decoded_data.password);
            if (matchPassword) {
                return res.status(200).json({
                    status: 400,
                    data: null,
                    message: 'New password can\'t match with old password.',
                    error: true,
                });
            } else{
                const salt = await bcrypt.genSalt();
                req.body.new_password = await bcrypt.hash(req.body.new_password, salt);
                const result = await User.update({password: req.body.new_password}, {id: req.decoded_data.id});
                if (result){
                    return res.status(200).json({
                        status: 200,
                        data: null,
                        message: 'Password changed successfully.',
                        error: null,
                    });
                }
            }
        } else{
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Old password do not match with our records.',
                error: true,
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    } 
}

/**
 * @params:      
 * @purpose:     To get brands according to selected (Rental) activity
*/
controller.brands  = async (req, res) => {
    await Brands.findAll({where: {status: '1'}, include:[{model: BrandVehicleTypes, where: {activity_id: req.params.activity_id},  required:true}]}).then(data => {
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Brands fetch successfully.',
            error: null,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    });
}

/**
 * @params:      brand_id
 * @purpose:     To get models according to selected brand
*/
controller.models  = async (req, res) => {
    await Models.findAll({where: {status: '1', brand_id: req.params.brand_id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Models fetch successfully.',
            error: null,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    });
}

/**
 * @params:      
 * @purpose:     To get privacy & policies
*/
controller.privacyPolicy  = async (req, res) => {
    await PrivacyPolicies.findOne().then(data => {
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Privacy & policies fetch successfully.',
            error: null,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    });
}

/**
 * @params:      
 * @purpose:     To get term & conditions
*/
controller.termConditions  = async (req, res) => {
    await TermConditions.findOne().then(data => {
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Term & conditions fetch successfully.',
            error: null,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    });
}

/**
 * @params:      Request
 * @purpose:     To store contact us
*/
controller.contactUsStore  = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        var extractedErrors = errors.array({ onlyFirstError: true });
        return res.status(200).json({
            status: 400,
            data: null,
            message: extractedErrors[0].msg,
            error: true,
        });
    }
    req.body.user_id = req?.decoded_data?.id;
    await ContactUs.create(req.body).then(data => {
        return res.status(200).json({
            status: 200,
            data: [],
            message: 'Message send successfully.',
            error: null,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    });
}

module.exports = controller;
