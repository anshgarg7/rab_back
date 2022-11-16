var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const Razorpay = require('razorpay');
const sendMail = require('../common/email');
const sendgridMail = require('../common/email');
var moment = require('moment');
const twilio = require('twilio');
const client = new twilio(config.TwilioAccountSid, config.TwilioAuthToken);
const { validationResult } = require('express-validator');

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const vendorBusinessDetails = require('../../model/vendor_business_details')(sequelize, DataTypes);
const Kycs = require('../../model/kyc')(sequelize, DataTypes);
const BankDetails = require('../../model/bank_details')(sequelize, DataTypes);
const PasswordResets = require('../../model/password_resets')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const UserService = require("../../service/user");

const Role = new RoleService();
const User = new UserService();

const controller = {};

/**
 * @params:      Request
 * @purpose:     To register Vendor
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
            var roleId = await Role.getIdByRoleName('Vendor');
            req.body.role_id = await roleId;
            req.body.is_approved = '0';
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                    req.body.image = await req.files.image[0].filename;
                }
                if (req.files.visiting_card_image && Object.keys(req.files.visiting_card_image).length) {
                    req.body.visiting_card_image = await req.files.visiting_card_image[0].filename;
                }
                if (req.files.award_certification_image && Object.keys(req.files.award_certification_image).length) {
                    req.body.award_certification_image = await req.files.award_certification_image[0].filename;
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
                let locationImageData = { image: req.body.location_image ? req.body.location_image : 'https://media-cdn.tripadvisor.com/media/photo-s/12/82/4f/a0/amazing-view-of-our-camp.jpg' };
                let isLocationImage = await vendorBusinessDetails.findOne({where: { exact_location_name: req.body.exact_location_name }});
                if(isLocationImage){
                    var locationImage = { id: isLocationImage.location_image_id };
                } else{
                    var locationImage = await User.addVendorLocationImage(locationImageData);
                }
                if(locationImage){
                    req.body.user_id = signUp.id;
                    req.body.location_image_id = locationImage.id;
                    await User.registerVendorBusinessDetail(req.body);
                    return res.status(200).json({
                        status: 200,
                        data: null,
                        message: 'Vendor signup successfully.',
                        error: null,
                    });
                }
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
 * @purpose:     To authenticate Vendor
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
        var vendorRoleId = await Role.getIdByRoleName('Vendor');
        const { email, password } = req.body;
        var vendor = await User.getUserOne({ email: email, role_id: vendorRoleId });
        if (vendor && Object.keys(vendor).length) {
            const getUp = await User.getVendorOne({email, status: '1'});
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
                                    is_approved: getUp.is_approved,
                                    status: getUp.status,
                                    vendor_business_detail: {
                                        business_name: getUp.vendor_business_detail.business_name,
                                        aletrnate_country_iso: getUp.vendor_business_detail.aletrnate_country_iso,
                                        aletrnate_country_code: getUp.vendor_business_detail.aletrnate_country_code,
                                        aletrnate_mobile_no: getUp.vendor_business_detail.aletrnate_mobile_no,
                                        category_id: getUp.vendor_business_detail.category_id,
                                        location: getUp.vendor_business_detail.location,
                                        latitude: getUp.vendor_business_detail.latitude,
                                        longitude: getUp.vendor_business_detail.longitude,
                                        gst_no: getUp.vendor_business_detail.gst_no,
                                        description: getUp.vendor_business_detail.description,
                                        is_visiting_card: getUp.vendor_business_detail.is_visiting_card,
                                        visiting_card_image: getUp.vendor_business_detail.visiting_card_image,
                                        award_certification_image: getUp.vendor_business_detail.award_certification_image,
                                    },
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
        var roleId = await Role.getIdByRoleName('Vendor');
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
    var roleId = await Role.getIdByRoleName('Vendor');
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
 * @purpose:     To Vendor KYC
*/
controller.kyc = async (req, res) => {
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
        req.body.user_id = req.decoded_data.id;
        if (req.files && Object.keys(req.files).length) {
            if (req.files.identity && Object.keys(req.files.identity).length) {
                req.body.identity = req.files.identity[0].filename;
            }
        }
        await Kycs.create(req.body).then(data => {
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'KYC successfully.',
                error: null,
            });
        }).catch(err => {
            return res.status(500).json({
                status: 500,
                data: null,
                message: 'Somthing went wrong.',
                errors: err
            });
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
 * @purpose:     To Vendor Bank details
*/
controller.bankDetail = async (req, res) => {
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
        req.body.user_id = req.decoded_data.id;
        var bankDetails = await BankDetails.create(req.body);
        if (bankDetails){
            const isRazorpayCustomer = await RazorpayCustomer.findOne({where: { user_id: req.decoded_data.id }});
            var instance = new Razorpay({ key_id: config.RazorpayKeyId, key_secret: config.RazorpaySecret })
            if (!isRazorpayCustomer){
                /* create razorpay customer */ 
                var customerResponse = await instance.customers.create({
                    name: req.decoded_data.first_name+' '+req.decoded_data.last_name,
                    email: req.decoded_data.email,
                    fail_existing: 0
                });
                let customerData = {
                    user_id: req.decoded_data.id,
                    customer_id: customerResponse.id,
                    entity: customerResponse.entity,
                    name: customerResponse.name,
                    email: customerResponse.email,
                    created_at : customerResponse.created_at,
                }
                await RazorpayCustomer.create(customerData);
            }
        }
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Bank details added successfully.',
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
 * @purpose:     To vendor forgot password
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
        var roleId = await Role.getIdByRoleName('Vendor');
        const isVendor = await User.getUserOne({email: req.body.email, role_id: roleId, status: '1'});
        if(!isVendor){
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Email do not exist in our records.',
                error: true,
            });
        } else{
            const token = jwt.sign({
                email: isVendor.email,
            }, config.SECRET, { expiresIn: '1h' });
            var mesg = 'Hi '+ isVendor.first_name +' '+ isVendor.last_name +', <br> To reset your password, click on the link below: <br> <a href="' + config.FrontendUrl + 'newpassword/'+token+'">'+ config.FrontendUrl + 'newpassword/'+token+'</a>';
            await sendgridMail.sendgridEmailSend(isVendor.email, config.ADMIN_NAME + '<' + config.ADMIN_EMAIL + '>', 'Reset Password', mesg, [],  async function (response) {
                if(response){
                    await PasswordResets.destroy({where: {email: isVendor.email}});
                    await PasswordResets.create({email: isVendor.email, token: token});
                    return res.status(200).json({
                        status: 200,
                        data: null,
                        message: 'Link send successfully on your email.',
                        error: null,
                    });
                } else{
                    return res.status(200).json({
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