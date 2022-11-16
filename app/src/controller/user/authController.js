const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const sendMail = require('../common/email');
const sendgridMail = require('../common/email');
var moment = require('moment');
const twilio = require('twilio');
const client = new twilio(config.TwilioAccountSid, config.TwilioAuthToken);

const { validationResult } = require('express-validator');

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const PasswordResets = require('../../model/password_resets')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const Categories = require('../../model/categories')(sequelize, DataTypes);
const UserInterestedActivities = require('../../model/user_interested_activities')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const UserService = require("../../service/user");

const Role = new RoleService();
const User = new UserService();

Activities.belongsTo(Categories, {
    foreignKey: 'category_id'
});

Users.hasMany(UserInterestedActivities, {
    foreignKey: 'user_id'
});

UserInterestedActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

const controller = {};

/**
 * @params:      Request
 * @purpose:     To authenticate user
*/
controller.login = async (req, res) => {
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
        var roleId = await Role.getIdByRoleName('User');
        const { email, password } = req.body;
        var user = await User.getUserOne({ email: email, role_id: roleId });
        if (user && Object.keys(user).length) {
            const getUp = await User.getUserOne({email, status: '1'});
            if (getUp && Object.keys(getUp).length) {
                const match = await bcrypt.compare(password, getUp.password);
                if (match) {
                    if(getUp.is_otp_verified == '1') {
                        const token = jwt.sign({ authUser: getUp }, config.SECRET);
                        return res.status(200).json({
                            status: 200,
                            data: {
                                token,
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
                                status: getUp.status,
                            },
                            message: 'Login successfully.',
                            error: null,
                        });
                    } else{
                        return res.status(200).json({
                            status: 400,
                            data: {
                                country_iso: getUp.country_iso,
                                country_code: getUp.country_code,
                                mobile_no: getUp.mobile_no,
                                is_otp_verified: getUp.is_otp_verified
                            },
                            message: 'OTP is not verified.',
                            error: true,
                        }); 
                    }
                } else {
                    return res.status(200).json({
                        status: 400,
                        data: null,
                        message: 'Email and password do not match.',
                        error: true,
                    });
                }
            } else {
                return res.status(200).json({
                    status: 400,
                    data: {status: getUp.status},
                    message: 'Account is closed by admin.',
                    error: true,
                })
            }
        } else {
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Email do not exist in our records.',
                error: true,
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        })
    }
}

/**
 * @params:      Request
 * @purpose:     To register user
*/
controller.register = async (req, res) => {
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
        var isUserExistEmail = await User.checkUserExist({email:req.body.email});
        var isUserExistMobile = await User.checkUserExist({mobile_no:req.body.mobile_no});
        if(isUserExistEmail && Object.keys(isUserExistEmail).length) {
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Email already exists.',
                error: true,
            });
        } else if(isUserExistMobile && Object.keys(isUserExistMobile).length){
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Mobile already exists.',
                error: true,
            });
        } else{
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('User');
            req.body.role_id = await roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                    req.body.image = await req.files.image[0].filename;
                }
            }
            req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
            const otpGenerate = Math.floor(1000 + Math.random() * 9000);
            req.body.otp = otpGenerate;
            // await client.messages.create({
            //     body: otpGenerate,
            //     to: '+918628988200',
            //     from: '+16066128033',
            // });
            const signUp = await User.register(req.body);
            if (signUp){
                return res.status(200).json({
                    status: 200,
                    data: null,
                    message: 'User signup successfully.',
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
 * @purpose:     To otp Verify
*/
controller.otpVerify = async (req, res) => {
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
        var roleId = await Role.getIdByRoleName('User');
        const isData = await Users.findOne({where: {mobile_no: req.body.mobile_no, role_id: roleId}});
        if(isData.otp == req.body.otp){
            await Users.update({is_otp_verified: '1'}, {where: {mobile_no: req.body.mobile_no, role_id: roleId}}).then(data => {
                return res.status(200).json({
                    status: 200,
                    data: null,
                    message: 'OTP verified successfully.',
                    error: null,
                });
            }).catch(err => {
                return res.status(500).json({
                    status: 500,
                    data: null,
                    message: 'Somthing went wrong.',
                    errors: err,
                });
            });
        } else{
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Invalid OTP.',
                errors: true,
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        })
    }
}

/**
 * @params:      Request
 * @purpose:     To update mobile number
*/
controller.updateMobileNo = async (req, res) => {
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
    var roleId = await Role.getIdByRoleName('User');
    const otpGenerate = Math.floor(1000 + Math.random() * 9000);
    await Users.update({mobile_no: req.body.new_mobile_no, otp: otpGenerate}, {where: {mobile_no: req.body.old_mobile_no, role_id: roleId}}).then(data => {
        client.messages.create({
                    body: otpGenerate,
                    to: '+918628988200',
                    from: '+16066128033',
                });
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Mobile number updated successfully.',
            error: null,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            errors: err,
        });
    });
}

/**
 * @params:      Request
 * @purpose:     To user forgot password
*/
controller.forgotPassword = async (req, res) => {
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
        var roleId = await Role.getIdByRoleName('User');
        const isUser = await User.getUserOne({email: req.body.email, role_id: roleId, status: '1'});
        if(!isUser){
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Email do not exist in our records.',
                error: true,
            });
        } else{
            const token = jwt.sign({
                email: isUser.email,
            }, config.SECRET, { expiresIn: '1h' });
            var mesg = 'Hi '+ isUser.first_name +' '+ isUser.last_name +', <br> To reset your password, click on the link below: <br> <a href="' + config.BASE_URL + 'api/v1/vendor/reset_password/'+token+'">'+ config.BASE_URL + 'api/v1/vendor/reset_password/'+token+'</a>';
            await sendgridMail.sendgridEmailSend(isUser.email, config.ADMIN_NAME + '<' + config.ADMIN_EMAIL + '>', 'Reset Password', mesg, [],  async function (response) {
                if(response){
                    await PasswordResets.destroy({where: {email: isUser.email}});
                    await PasswordResets.create({email: isUser.email, token: token});
                    return res.status(200).json({
                        status: 200,
                        data: null,
                        message: 'Link send successfully on your email.',
                        error: null,
                    });
                } else{
                    return res.status(500).json({
                        status: 500,
                        data: null,
                        message: 'Email not send.',
                        error: true,
                    });
                } 
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
 * @purpose:     To get all activities listning
*/
controller.getAllActivities = async (req, res) => {
    await Activities.findAll({
            where: { status: '1' },
            include: [{ model: Categories }]
        }).then(data => {
        var newData = [];
        for (const [index, val] of data.entries()) {
            if(val.category.title == 'Adventure'){
                newData.push({
                    id: val.id,
                    category_id: val.category_id,
                    activity_category: 'Adventure',
                    title: val.title,
                    image: val.image,
                    status: val.status,
                    createdAt: val.createdAt,
                    updatedAt: val.updatedAt,
                });
            } else if(val.category.title == 'Rental'){
                newData.push({
                    id: val.id,
                    category_id: val.category_id,
                    activity_category: 'Rental',
                    title: val.title,
                    image: val.image,
                    status: val.status,
                    createdAt: val.createdAt,
                    updatedAt: val.updatedAt,
                });
            }
        }
        return res.status(200).json({
            status: 200,
            data: newData,
            message: 'Activities fetch successfully.',
            error: null
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
 * @purpose:     To get user intersted activities
*/
controller.getAllUserInterestedActivities = async (req, res) => {
    try{
        var data = await Users.findOne({
            attributes: ['level'],
            where: {id: req.decoded_data.id},
            include: [
                {model: UserInterestedActivities, attributes: ['activity_id'], 
                    include: [
                        {model: Activities, attributes: ['id', 'title', 'image'], required: true}
                    ]
                },
            ]
        });
        if(data){
            return res.status(200).json({
                status: 200,
                data: data,
                message: 'User interested activities fetch successfully.',
                error: null,
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
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
 * @purpose:     To store user intersted activities
*/
controller.userInterstedActivitiesStore = async (req, res) => {
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
        var roleId = await Role.getIdByRoleName('User');
        const isUser = await User.getUserOne({email: req.body.email, mobile_no: req.body.mobile_no, role_id: roleId});
        if(isUser){
            await Users.update({level: req.body.level}, {where: {id: isUser.id}});
            await UserInterestedActivities.destroy({where: {user_id: isUser.id, activity_id: { $notIn: req.body.activity_id}}});
            if(req.body.activity_id && req.body.activity_id.length){
                await req.body.activity_id.forEach(async (val, index) => {
                    var isUserInterestedActivities = await UserInterestedActivities.findOne({where: {user_id: isUser.id, activity_id: val}});
                    if(!isUserInterestedActivities){
                        req.body.user_id = isUser.id;
                        req.body.activity_id = val;
                        await UserInterestedActivities.create(req.body);
                    }
                });
                return res.status(200).json({
                    status: 200,
                    data: null,
                    message: 'User interested activities added successfully.',
                    error: null,
                });
            }
        } else{
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'User do not exist in our records.',
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

module.exports = controller;