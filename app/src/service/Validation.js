const Sequelize = require("sequelize");
const { check } = require('express-validator');
const env = process.env.NODE_ENV || 'development';
const development = require(__dirname + '../../../../config.json')[env];

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const DataTypes = Sequelize.DataTypes;
var sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,
    operatorsAliases: operatorsAliases,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

    // SQLite only
    //storage: 'path/to/database.sqlite'
});

const validation = {

    LOGIN: [
        check('email')
            .notEmpty().withMessage('Please enter your email.')
            .isLength({ max: 40 }).withMessage('Email may not be greater than 40 characters.')
            .matches(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).withMessage('Please enter a valid email address'),

        check('password')
        .notEmpty().withMessage('Please enter your password.')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
            .isLength({ max: 16 }).withMessage('Password may not be greater than 16 characters.'),
    ],

    USER_SIGNUP: [
        check('first_name')
            .notEmpty().withMessage('Please enter your firstname.')
            .isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters!!!.')
            .isLength({ max: 10 }).withMessage('Firstname not be greater than 10 characters.')
            .isAlpha().withMessage('Firstname only contain letters.'),

        check('last_name')
            .isLength({ max: 10 }).withMessage('Lastname not be greater than 10 characters.')
            .isAlpha().withMessage('Lastname only contain letters.'),

        check('email')
            .notEmpty().withMessage('Please enter your email.')
            .isLength({ max: 40 }).withMessage('Email may not be greater than 40 characters.')
            .matches(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).withMessage('Please enter a valid email address'),

        check('password')
            .notEmpty().withMessage('Please enter your password.')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
            .isLength({ max: 16 }).withMessage('Password may not be greater than 16 characters.'),

        check('country_iso')
            .notEmpty().withMessage('Please enter country iso.')
            .isLength({ max: 10 }).withMessage('Country iso may not be greater than 10 characters.'),

        check('country_code')
            .notEmpty().withMessage('Please enter country code.')
            .isLength({ max: 10 }).withMessage('Country code may not be greater than 10 characters.'),

        check('mobile_no')
            .notEmpty().withMessage('Please enter your mobile number.')
            .isLength({ max: 20 }).withMessage('Mobile may not be greater than 20 characters.'),

        check('gender')
            .notEmpty().withMessage('Please select your gender.')
            .isLength({ max: 10 }).withMessage('Gender may not be greater than 10 characters.')
            .isAlpha().withMessage('Gender only contain letters.'),

        check('dob')
            .notEmpty().withMessage('Please select your date of birth.'),  

        check('country')
            .notEmpty().withMessage('Please select your country.')
            .isLength({ max: 20 }).withMessage('Country may not be greater than 20 characters.')
            .matches(/^[A-Za-z\s]+$/).withMessage('Country must be alphabetic.'),
        
        check('state')
            .notEmpty().withMessage('Please select your state.')
            .isLength({ max: 20 }).withMessage('State may not be greater than 20 characters.')
            .matches(/^[A-Za-z\s]+$/).withMessage('State must be alphabetic.'),

        check('city')
            .notEmpty().withMessage('Please select your city.')
            .isLength({ max: 20 }).withMessage('City may not be greater than 20 characters.')
            .matches(/^[A-Za-z\s]+$/).withMessage('City must be alphabetic.'),
        
        check('address')
            .notEmpty().withMessage('Please select your city.')
            .isLength({ max: 191 }).withMessage('Address not be greater than 191 characters.'),
    
        check('pin_code')
            .notEmpty().withMessage('Please enter your pin code.')
            .optional({ checkFalsy: true }).isInt()
            .isLength({ max: 11 }).withMessage('Pin code not be greater than 11 characters.'),

        check('landmark')
            .notEmpty().withMessage('Please enter your landmark.')
            .isLength({ max: 191 }).withMessage('Landmark not be greater than 191 characters.'),

        check('image')
            .custom((value, {req}) => {
                    if(req.files.image[0].mimetype === 'image/png' || req.files.image[0].mimetype === 'image/jpeg' || req.files.image[0].mimetype === 'image/gif'){
                        return '.png, .jpeg, .gif';
                    } else{
                        return false;
                    }
                })
            .withMessage('Upload only .png, .jpeg, .gif image.'),

        check('device_type')
            .notEmpty().withMessage('Please enter device type.')
            .isIn(['Android', 'Ios', 'Web']).withMessage('Please enter valid device type.'),    
    ],

    VENDOR_BUSINESS_DETAIL: [
        check('business_name')
            .notEmpty().withMessage('Please enter your business name.')
            .isLength({ max: 50 }).withMessage('Business name not be greater than 50 characters.'),
            
        check('aletrnate_country_iso')
            .notEmpty().withMessage('Please enter aletrnate country iso.')
            .isLength({ max: 10 }).withMessage('Aletrnate country iso may not be greater than 10 characters.'),

        check('aletrnate_country_code')
            .notEmpty().withMessage('Please enter aletrnate country code.')
            .isLength({ max: 10 }).withMessage('Aletrnate country code may not be greater than 10 characters.'),
        
        check('aletrnate_mobile_no')
            .notEmpty().withMessage('Please enter your aletrnate mobile number.')
            .isLength({ max: 20 }).withMessage('Aletrnate mobile may not be greater than 20 characters.'),

        check('category_id')
            .notEmpty().withMessage('Please select your business category.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Category not be greater than 11 characters.'),
        
        check('location')
            .notEmpty().withMessage('Please enter your location.')
            .isLength({ max: 191 }).withMessage('Location not be greater than 191 characters.'),

        check('latitude')
            .notEmpty().withMessage('Please enter latitude.')
            .isLength({ max: 191 }).withMessage('Latitude not be greater than 191 characters.'),

        check('longitude')
            .notEmpty().withMessage('Please enter longitude.')
            .isLength({ max: 191 }).withMessage('Longitude not be greater than 191 characters.'),

        check('gst_no')
            .notEmpty().withMessage('Please enter your business GST number.')
            .isLength({ max: 50 }).withMessage('GST number not be greater than 50 characters.'),

        check('description')
            .notEmpty().withMessage('Please enter your business description.')
            .isLength({ max: 191 }).withMessage('Business description not be greater than 191 characters.'),

        check('visiting_card_image')
            .custom((value, {req}) => {
                    var img = req.files?.visiting_card_image?.[0];
                    if(img) {
                        if(['image/png', 'image/jpeg', 'image/gif'].includes(img.mimetype)) {
                            return '.png, .jpeg, .gif';
                        } else{
                            return false;
                        }
                    } else {
                        return true;
                    }
                })
            .withMessage('Upload only .png, .jpeg, .gif visiting card image.'),

        check('award_certification_image')
            .custom((value, {req}) => {
                    var img = req.files?.award_certification_image?.[0];
                    if(img) {
                        if(img && ['image/png', 'image/jpeg', 'image/gif'].includes(img.mimetype)) {
                            return '.png, .jpeg, .gif';
                        } else{
                            return false;
                        }
                    } else {
                        return true;
                    }
                })
            .withMessage('Upload only .png, .jpeg, .gif award certification image.'),
    ],

    OTP_VERIFY: [
        check('mobile_no')
            .notEmpty().withMessage('Please enter mobile no.')
            .isLength({ max: 20 }).withMessage('Mobile may not be greater than 20 characters.'),

        check('otp')
            .notEmpty().withMessage('Please enter otp.'),
    ],

    UPDATE_MOBILE: [
        check('old_mobile_no')
            .notEmpty().withMessage('Please enter your old mobile no.')
            .isLength({ max: 20 }).withMessage('Mobile may not be greater than 20 characters.'),

        check('country_iso')
            .notEmpty().withMessage('Please enter country iso.')
            .isLength({ max: 10 }).withMessage('Country iso may not be greater than 10 characters.'),

        check('country_code')
            .notEmpty().withMessage('Please enter country code.')
            .isLength({ max: 10 }).withMessage('Country code may not be greater than 10 characters.'),

        check('new_mobile_no')
        .notEmpty().withMessage('Please enter your new mobile no.')
        .isLength({ max: 20 }).withMessage('Mobile may not be greater than 20 characters.'),
    ],

    KYC: [
        check('identity')
            .custom((value, {req}) => {
                    if(req.files.identity[0].mimetype === 'image/png' || req.files.identity[0].mimetype === 'image/jpeg' || req.files.identity[0].mimetype === 'image/gif'){
                        return '.png, .jpeg, .gif';
                    } else{
                        return false;
                    }
                })
            .withMessage('Upload only .png, .jpeg, .gif identity image.'),
    ],

    BANK_DETAIL: [
        check('account_holder_name')
            .notEmpty().withMessage('Please enter account holder name.')
            .isLength({ min: 3 }).withMessage('Account holder name may be at least 3 characters.')
            .isLength({ max: 20 }).withMessage('Account holder name not be greater than 20 characters.'),

        check('account_no')
            .notEmpty().withMessage('Please enter your account number.')
            .optional({ checkFalsy: false }).isInt({min: 10}).withMessage('Account number may be at least 10 characters.')
            .isLength({ max: 16 }).withMessage('Account number not be greater than 20 characters.'),
            
        check('ifsc_code')
            .notEmpty().withMessage('Please enter IFSC code.')
            .isLength({ max: 10 }).withMessage('IFSC code not be greater than 10 characters.'),
    ],

    FORGOT_PASS: [
        check('email')
            .notEmpty().withMessage('Please enter your email.')
            .isLength({ max: 40 }).withMessage('Email may not be greater than 40 characters.')
            .matches(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).withMessage('Please enter a valid email address'),
    ],

    RESET_PASS: [
        check('password')
            .notEmpty().withMessage('Please enter your password.')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
            .isLength({ max: 16 }).withMessage('Password may not be greater than 16 characters.'),
    ],

    UPDATE_PROFILE: [
        check('first_name')
            .notEmpty().withMessage('Please enter your firstname.')
            .isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters!!!.')
            .isLength({ max: 10 }).withMessage('Firstname not be greater than 10 characters.')
            .isAlpha().withMessage('Firstname only contain letters.'),

        check('last_name')
            .isLength({ max: 10 }).withMessage('Lastname not be greater than 10 characters.')
            .isAlpha().withMessage('Lastname only contain letters.'),

        check('country_iso')
            .notEmpty().withMessage('Please enter country iso.')
            .isLength({ max: 10 }).withMessage('Country iso may not be greater than 10 characters.'),

        check('country_code')
            .notEmpty().withMessage('Please enter country code.')
            .isLength({ max: 10 }).withMessage('Country code may not be greater than 10 characters.'),

        check('mobile_no')
            .notEmpty().withMessage('Please enter your mobile number.')
            .isLength({ max: 20 }).withMessage('Mobile may not be greater than 20 characters.'),

        check('gender')
            .notEmpty().withMessage('Please select your gender.')
            .isLength({ max: 10 }).withMessage('Gender may not be greater than 10 characters.')
            .isAlpha().withMessage('Gender only contain letters.'),

        check('dob')
            .notEmpty().withMessage('Please select your date of birth.'),  

        check('image')
            .custom((value, {req}) => {
                if(req.body.image != undefined){
                    if(req.files.image[0].mimetype === 'image/png' || req.files.image[0].mimetype === 'image/jpeg' || req.files.image[0].mimetype === 'image/gif'){
                        return '.png, .jpeg, .gif';
                    } else{
                        return false;
                    }
                } else{
                    return true; 
                }
            })
            .withMessage('Upload only .png, .jpeg, .gif image.'),
    ],

    CHANGE_PASS: [
        check('old_password')
            .notEmpty().withMessage('Please enter your old password.')
            .isLength({ min: 8 }).withMessage('Old password must be at least 8 characters.')
            .isLength({ max: 16 }).withMessage('Old password may not be greater than 16 characters.'),

        check('new_password')
            .notEmpty().withMessage('Please enter your new password.')
            .isLength({ min: 8 }).withMessage('New password must be at least 8 characters.')
            .isLength({ max: 16 }).withMessage('New password may not be greater than 16 characters.'),
    ],

    USER_INTERSTED_ACTIVITIES: [
        check('email')
            .notEmpty().withMessage('Please enter your email.')
            .isLength({ max: 40 }).withMessage('Email may not be greater than 40 characters.')
            .matches(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i).withMessage('Please enter a valid email address'),

        check('mobile_no')
            .notEmpty().withMessage('Please enter your mobile number.')
            .isLength({ max: 20 }).withMessage('Mobile may not be greater than 20 characters.'),

        check("activity_id")
            .isArray().withMessage('Activity id\'s is not in array.')
            .custom((value) => {
                value = value.map(v => parseInt(v));
                const vald = (v) => Number.isInteger(v) && v > 0;
                if (!value.every(vald)) throw new Error('Array does not contain Integers');
                return true;
            }),

        check('level')
            .notEmpty().withMessage('Please select activities level.')
            .isIn(['1', '2', '3']).withMessage('Please enter valid level.'),
    ],

    UPDATE_STATUS: [
        check('status')
            .notEmpty().withMessage('Please enter status value.')
            .isIn(['0', '1']).withMessage('Please enter valid status value.'),
    ],

    SLOT_UPDATE_STATUS: [
        check('status')
            .notEmpty().withMessage('Please enter status value.')
            .isIn(['0', '1']).withMessage('Please enter valid status value.'),

        check('activity_type')
            .notEmpty().withMessage('Please enter activity type.')
            .isIn(['1', '2']).withMessage('Please enter valid activity type.'),
    ],

    CONTACT_US: [
        check('message')
            .notEmpty().withMessage('Please enter your message.'),
    ],

    RENTAL_ACTIVITY: [
        check('activity_id')
            .notEmpty().withMessage('Please enter activity id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Activity id not be greater than 11 characters.'),

        check('brand_id')
            .notEmpty().withMessage('Please enter brand id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Brand id not be greater than 11 characters.'),
        
        check('model_id')
            .notEmpty().withMessage('Please enter model id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Model id not be greater than 11 characters.'), 

        check('title')
            .notEmpty().withMessage('Please enter title.')
            .isLength({ max: 191 }).withMessage('Title not be greater than 191 characters.'),

        check('quantity')
            .notEmpty().withMessage('Please enter quantity.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Quantity not be greater than 11 characters.'),

        check('vehicle_details')
            .custom((value) => {
                if (value.some(v => (v.year == ''))) throw new Error('Please enter Vehicle year.');
                if (value.some(v => (v.registration_no == ''))) throw new Error('Please enter Vehicle registration number.');
                if (value.some(v => (v.year.length != 4))) throw new Error('Please enter valid year.');
                if (value.some(v => !(v.registration_no.length < 20))) throw new Error('Registration number not be greater than 20 characters.');
                if (value.some(v => !v.registration_no.match(/^[A-Z0-9]*$/))) throw new Error('Please enter valid registration number.');
                if(value.map(v => v.registration_no).length > new Set(value.map(v => v.registration_no)).size) throw new Error('Registration number already exists.')
                return true;
            }),

        check('what_to_take')
            .custom((value, {req}) => {
                if(req.body?.what_to_take != undefined){
                    if(req.params.id){
                        if(value.some(v => !(v.name.length < 191))) throw new Error('What to take not be greater than 191 characters.')
                        return true;
                    } else{
                        if(value.some(v => !(v.length < 191))) throw new Error('What to take not be greater than 191 characters.')
                        return true;
                    }
                } else{
                    return true;
                }
            }),

        check('thing_service_included')
            .custom((value, {req}) => {
                if(req.body?.thing_service_included != undefined){
                    if(req.params.id){
                        if(value.some(v => !(v.name.length < 191))) throw new Error('What to take not be greater than 191 characters.')
                        return true;
                    } else{
                        if(value.some(v => !(v.length < 191))) throw new Error('What to take not be greater than 191 characters.')
                        return true;
                    }
                } else{
                    return true;
                }
            }),
    ],

    ADVENTURE_ACTIVITY: [
        check('activity_id')
            .notEmpty().withMessage('Please enter activity id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Activity id not be greater than 11 characters.'),

        check('activity_adventure_type_id')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .notEmpty().withMessage('Please enter activity adventure type id.'),

        check('title')
            .notEmpty().withMessage('Please enter title.')
            .isLength({ max: 191 }).withMessage('Title not be greater than 191 characters.'),
        
        check('level')
            .notEmpty().withMessage('Please enter level value.')
            .isIn(['1', '2', '3']).withMessage('Invalid value.'),

        check('altitude_depth_height')
            .notEmpty().withMessage('Please enter altitude/depth/height value.'),

        check('age_from')
            .notEmpty().withMessage('Please enter age_from.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Age not be greater than 11 characters.'),

        check('age_to')
            .notEmpty().withMessage('Please enter age_to.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Age not be greater than 11 characters.'),

        check('language')
            .custom((value) => {
                if (value.some(v => (v == ''))) throw new Error('Please select language.');
                if (value.some(v => !(v.length < 191))) throw new Error('Language not be greater than 191 characters.');
                return true;
            }), 
        
        check('description')
            .notEmpty().withMessage('Please enter description.'),

        check('warning')
            .notEmpty().withMessage('Please enter warning.'),  
            
        check('what_to_take')
            .custom((value, {req}) => {
                if(req.body?.what_to_take != undefined){
                    if(value.some(v => !(v.name.length < 191))) throw new Error('What to take not be greater than 191 characters.')
                    return true;
                } else{
                    return true;
                }
            }),

        check('thing_service_included')
            .custom((value, {req}) => {
                if(req.body?.thing_service_included != undefined){
                    if(value.some(v => !(v.name.length < 191))) throw new Error('Thing service included not be greater than 191 characters.')
                    return true;  
                } else{
                    return true;
                }
            }),
        
        check('is_pickup')
            .notEmpty().withMessage('Please select is pickup.')
            .isIn(['0', '1']).withMessage('Invalid value.'),

        check('is_extra_charges')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select is extra charges.')
            .isIn(['0', '1']).withMessage('Invalid value.'),

        check('address_line_one')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter address line one.')
            .isLength({ max: 191 }).withMessage('Address line one not be greater than 191 characters.'), 

        check('address_line_two')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .isLength({ max: 191 }).withMessage('Address line two not be greater than 191 characters.'),

        check('landmark')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter landmark.')
            .isLength({ max: 191 }).withMessage('Landmark not be greater than 191 characters.'),

        check('country')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select your country.')
            .isLength({ max: 20 }).withMessage('Country may not be greater than 20 characters.')
            .matches(/^[A-Za-z\s]+$/).withMessage('Country must be alphabetic.'),
        
        check('state')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select your state.')
            .isLength({ max: 20 }).withMessage('State may not be greater than 20 characters.')
            .matches(/^[A-Za-z\s]+$/).withMessage('State must be alphabetic.'),

        check('city')
        .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select your city.')
            .isLength({ max: 20 }).withMessage('City may not be greater than 20 characters.')
            .matches(/^[A-Za-z\s]+$/).withMessage('City must be alphabetic.'),
            
        check('pin_code')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter your pin code.')
            .optional({ checkFalsy: true }).isInt()
            .isLength({ max: 11 }).withMessage('Pin code not be greater than 11 characters.'),
            
        check('latitude')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter latitude.')
            .isLength({ max: 191 }).withMessage('Latitude not be greater than 191 characters.'),

        check('longitude')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter longitude.')
            .isLength({ max: 191 }).withMessage('Longitude not be greater than 191 characters.'),
            
        check('location')
            .if(check('is_pickup').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter your location.')
            .isLength({ max: 191 }).withMessage('Location not be greater than 191 characters.'), 

        /*check('meeting_point_id')
            .custom((value, {req}) => {
                if(req.params?.id && req.body?.is_pickup == '1' && !value) throw new Error('Please enter meeting point id.')
                return true;
            }),*/
            
        check('adventure_activity_id')
            .if(check('activity_type_data.activity_type').notEmpty().isIn(['1', '2']))
            .notEmpty().withMessage('Please enter adventure activity id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Activity id not be greater than 11 characters.'),
            
        check('activity_type_data.slot_type')
            .if(check('activity_type_data.activity_type').notEmpty().isIn(['1']))
            .if(check('activity_type_data.single_day_categories').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select slot type.')
            .isIn(['1', '2']).withMessage('Invalid value.'),
            
        check('activity_time_sheet_id')
            .if(check('activity_type_data.slot_type').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter activity time sheet id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Activity time sheet id not be greater than 11 characters.'),

        check('activity_type_data.auto.start_time') 
            .if(check('activity_type_data.slot_type').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select your start time.'),

        check('activity_type_data.auto.slot_time_duration')
            .if(check('activity_type_data.slot_type').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please select your slot time duration.'),

        check('activity_type_data.auto.day_slot')
            .if(check('activity_type_data.slot_type').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter your day slot.')
            .optional({ checkFalsy: true }).isInt()
            .isLength({ max: 11 }).withMessage('Day slot not be greater than 11 characters.'),    

        check('activity_type_data.auto.time_slot')
            .if(check('activity_type_data.slot_type').notEmpty().isIn(['1']))
            .notEmpty().withMessage('Please enter your day slot.')
            .optional({ checkFalsy: true }).isInt()
            .isLength({ max: 11 }).withMessage('Day slot not be greater than 11 characters.'),
    
        check('activity_time_sheet_id')
            .if(check('activity_type_data.single_day_categories').notEmpty().isIn(['2']))
            .notEmpty().withMessage('Please enter activity time sheet id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Activity time sheet id not be greater than 11 characters.'),

        check('activity_type_data')
            .custom((value, {req}) => {
                if(!(req.params?.id) && value.single_day_categories == '2') {
                    if(value.flexd.some(v => !['3','4','5'].includes(v.slot_type))) throw new Error('Please select slot type.');
                    if(value.flexd.some(v => !(v.duration))) throw new Error('Please enter duration.');
                    if(value.flexd.some(v => !(v.start_time))) throw new Error('Please select start time.');
                    if(value.flexd.some(v => !(v.day_quantity))) throw new Error('Please enter day quantity.');
                    if(value.flexd.some(v => !(v.duration_quantity))) throw new Error('Please enter duration quantity.');
                    if(value.flexd.some(v => !(v.itinerary))) throw new Error('Please enter itinerary.');
                }
                if(!(req.params?.id) && !['1','2'].includes(value.activity_type)) throw new Error('Please select activity type.')
                if(!(req.params?.id) && value.activity_type == '1') {
                    if(!['1','2','3'].includes(value.single_day_categories)) throw new Error('Please select single day categories.')
                }
                return true 
            }),

        check('activity_type_data.duration')
            .if(check('activity_type_data.activity_type').notEmpty().isIn(['2']))
            .notEmpty().withMessage('Please enter duration.'),    
            
        check('activity_type_data.start_date')
            .if(check('activity_type_data.activity_type').notEmpty().isIn(['2']))
            .notEmpty().withMessage('Please select start time.'),    

        check('activity_type_data.no_of_spot')
            .if(check('activity_type_data.activity_type').notEmpty().isIn(['2']))
            .notEmpty().withMessage('Please enter number of spot.'),  

        check('activity_type_data.repeat_in_fature')
            .if(check('activity_type_data.activity_repeat_in_future').notEmpty().isIn(['1']))
            .custom((value, {req}) => {
                if(req.body?.activity_type_data.repeat_in_fature != undefined){
                    if (value.some(v => (v.repeat_start_date == '')) && value.every(v => !(v.spot == '')) ) throw new Error('Please select repeat start date.');
                    if (value.some(v => !(v.repeat_start_date == '')) && value.every(v => (v.spot == '')) ) throw new Error('Please enter spot.');
                    return true;
                } else{
                    return true; 
                }
            })

    ],

    VENDOR_ACTIVITY: [
        check('description')
            .notEmpty().withMessage('Please enter description.'),

        check('warning')
            .notEmpty().withMessage('Please enter warning.'),

        check('images')
            .custom((value, {req}) => {
                if(!req.params?.id){
                    if(req.files?.images.length){
                        return !req.files.images.some(v => {
                            return !(v.mimetype === 'image/png' || v.mimetype === 'image/jpeg' || v.mimetype === 'image/gif')
                        });
                    }
                } else{
                    return true;
                }
            })
            .withMessage('Upload only .png, .jpeg, .gif image.'),

        check('video')
            .custom((value, {req}) => {
                    if(req.files?.video != undefined){
                        if(req.files.video[0].mimetype === 'video/webm' || req.files.video[0].mimetype === 'video/mp4'){
                            return '.webm, .mp4';
                        } else{
                            return false;
                        }
                    } else{
                        return true; 
                    }    
                })
            .withMessage('Upload only .webm, .mp4 video.'),

        check('add_ons')
            .custom((value, {req}) => {
                if(req.body?.add_ons != undefined){
                    if (value.some(v => (v.item == '')) && value.every(v => !(v.price == '')) && value.every(v => !(v.quantity == ''))) throw new Error('Please enter item.');
                    if (value.some(v => !(v.item == '')) && value.every(v => (v.price == '')) && value.every(v => !(v.quantity == ''))) throw new Error('Please enter price.');
                    if (value.some(v => !(v.item == '')) && value.every(v => !(v.price == '')) && value.every(v => (v.quantity == ''))) throw new Error('Please enter quantity.');
                    return true;
                } else{
                    return true; 
                }
            })
    ],

    APPLY_REFERRAL: [
        check('referral_code')
            .notEmpty().withMessage('Please enter referral code.')
            .isLength({ min: 8 }).withMessage('Referral code not be less than 8 characters.')
            .isLength({ max: 191 }).withMessage('Referral code not be greater than 191 characters.'),
    ],

    BOOKING: [
        check('activity_category')
            .notEmpty().withMessage('Please enter activity category.')
            .isIn(['Adventure', 'Rental']).withMessage('Please enter valid activity category.'),

        check('activity_id')
            .notEmpty().withMessage('Please enter activity id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Activity id not be greater than 11 characters.'),

        check('quantity')
            .notEmpty().withMessage('Please enter quantity.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Quantity not be greater than 11 characters.'),

        check('price_type')
            .notEmpty().withMessage('Please select a price type.')
            .isIn(['1', '2', '3']).withMessage('Please enter valid price type.'),
        
        check('price')
            .notEmpty().withMessage('Please enter price.'),

        check('total_price')
            .notEmpty().withMessage('Please enter total price.'),

        check('start_date')
            .notEmpty().withMessage('Please select a start date.'), 
        
        check('end_date')
            .notEmpty().withMessage('Please select a end date.'), 
            
        check('start_time')
            .notEmpty().withMessage('Please select a start time.'), 
           
        check('end_time')
            .notEmpty().withMessage('Please select a end time.'), 

        check('slot_id')
            .if(check('activity_category').notEmpty().isIn(['Adventure']))
            .notEmpty().withMessage('Please enter slot id.'),

        check('is_referral_code')
            .isIn(['0', '1']).withMessage('Please enter valid is referral code.')
            .custom((value, {req}) => {
                if(req.body?.is_referral_code != undefined && req.body?.is_referral_code != '0'){
                    if (req.body?.referral_code == '') throw new Error('Please enter referral code.');
                    return true;
                } else{
                    return true; 
                }
            })
    ],

    BOOKING_PAYMENT: [
        check('booking_id')
            .notEmpty().withMessage('Please enter booking id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Booking id not be greater than 11 characters.'),
        
        check('payment_id')
            .notEmpty().withMessage('Please enter payment id.'),
    ],

    TAXI_FILTER: [
        check('pickup_latitude')
            .notEmpty().withMessage('Please enter pickup latitude.')
            .isLength({ max: 191 }).withMessage('Pickup latitude not be greater than 191 characters.'),

        check('pickup_longitude')
            .notEmpty().withMessage('Please enter pickup longitude.')
            .isLength({ max: 191 }).withMessage('Pickup longitude not be greater than 191 characters.'),

        check('drop_latitude')
            .notEmpty().withMessage('Please enter drop latitude.')
            .isLength({ max: 191 }).withMessage('Drop latitude not be greater than 191 characters.'),

        check('drop_longitude')
            .notEmpty().withMessage('Please enter drop longitude.')
            .isLength({ max: 191 }).withMessage('Drop longitude not be greater than 191 characters.'),

        check('start_date_time')
            .notEmpty().withMessage('Please select a start date & time.'), 
    ],

    TAXI_DETAIL: [
        check('total_km')
            .notEmpty().withMessage('Please enter total km.'),
    ],

    TAXI_BOOKING: [
        check('driver_id')
            .notEmpty().withMessage('Please enter driver id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Driver id not be greater than 11 characters.'),

        check('price')
            .notEmpty().withMessage('Please enter price.'),

        check('total_price')
            .notEmpty().withMessage('Please enter total price.'),

        check('start_date_time')
            .notEmpty().withMessage('Please select a start date & time.'), 
        
        check('pickup_latitude')
            .notEmpty().withMessage('Please enter pickup latitude.'), 

        check('pickup_longitude')
            .notEmpty().withMessage('Please enter pickup longitude.'), 

        check('drop_latitude')
            .notEmpty().withMessage('Please enter drop latitude.'), 

        check('drop_longitude')
            .notEmpty().withMessage('Please enter drop longitude.'), 

        check('pickup_location')
            .notEmpty().withMessage('Please enter pickup location.'), 

        check('drop_location')
            .notEmpty().withMessage('Please enter drop location.'), 
    ],

    TAXI_BOOKING_PAYMENT: [
        check('taxi_booking_id')
            .notEmpty().withMessage('Please enter taxi booking id.')
            .optional({ checkFalsy: false }).isInt({min: 1})
            .isLength({ max: 11 }).withMessage('Taxi booking id not be greater than 11 characters.'),
        
        check('payment_id')
            .notEmpty().withMessage('Please enter payment id.'),
    ],

    BOOKING_RATING_REVIEWS: [
        check('booking_id')
            .notEmpty().withMessage('Please enter booking id.'),

        check('rating')
            .notEmpty().withMessage('Please enter rating.')
            .isIn(['1', '2', '3', '4', '5']).withMessage('Please enter valid rating.'),

        check('review')
            .notEmpty().withMessage('Please enter review.'),
    ],

    TAXI_BOOKING_RATING_REVIEWS: [
        check('taxi_booking_id')
            .notEmpty().withMessage('Please enter taxi booking id.'),

        check('rating')
            .notEmpty().withMessage('Please enter rating.')
            .isIn(['1', '2', '3', '4', '5']).withMessage('Please enter valid rating.'),

        check('review')
            .notEmpty().withMessage('Please enter review.'),
    ],

    SKIP_BOOKING_RATING_REVIEWS: [
        check('booking_id')
            .notEmpty().withMessage('Please enter booking id.'),
    ],

    SKIP_TAXI_BOOKING_RATING_REVIEWS: [
        check('taxi_booking_id')
            .notEmpty().withMessage('Please enter taxi booking id.'),
    ],
}
   
module.exports = validation;