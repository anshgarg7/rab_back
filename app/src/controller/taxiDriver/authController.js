const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const sendMail = require('../common/email');
const sendgridMail = require('../common/email');

const twilio = require('twilio');
const client = new twilio(config.TwilioAccountSid, config.TwilioAuthToken);

const { validationResult } = require('express-validator');

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const PasswordResets = require('../../model/password_resets')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const UserService = require("../../service/user");

const Role = new RoleService();
const User = new UserService();

const controller = {};

/**
 * @params:      Request
 * @purpose:     To authenticate taxi driver
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
        var roleId = await Role.getIdByRoleName('Taxi Driver');
        const { email, password } = req.body;
        var user = await User.getUserOne({ email: email, role_id: roleId });
        if (user && Object.keys(user).length) {
            const getUp = await User.getUserOne({email, status: '1'});
            if (getUp && Object.keys(getUp).length) {
                const match = await bcrypt.compare(password, getUp.password);
                if (match) {
                    if(getUp.is_otp_verified == '1') {
                        if(getUp.is_approved == '1') {
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
                                data: null,
                                message: 'Account is not approved.',
                                error: true,
                            }); 
                        }
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
        var roleId = await Role.getIdByRoleName('Taxi Driver');
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
    var roleId = await Role.getIdByRoleName('Taxi Driver');
    const otpGenerate = Math.floor(1000 + Math.random() * 9000);
    await Users.update({mobile_no: req.body.new_mobile_no, otp: otpGenerate}, {where: {mobile_no: req.body.old_mobile_no, role_id: roleId}}).then(data => {
        client.messages.create({
                    body: otpGenerate,
                    to: '+919878594152',
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
 * @purpose:     To taxi driver forgot password
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
        var roleId = await Role.getIdByRoleName('Taxi Driver');
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
            var mesg = 'Hi '+ isUser.first_name +' '+ isUser.last_name +', <br> To reset your password, click on the link below: <br> <a href="' + config.BASE_URL + 'api/v1/taxi_driver/reset_password/'+token+'">'+ config.BASE_URL + 'api/v1/taxi_driver/reset_password/'+token+'</a>';
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

module.exports = controller;