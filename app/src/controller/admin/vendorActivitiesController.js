const {sequelize,DataTypes} = require('../../index');
var moment = require('moment');
const { dashboard } = require('./dashboardController');
const Users = require('../../model/users')(sequelize, DataTypes);
const vendorBusinessDetails = require('../../model/vendor_business_details')(sequelize, DataTypes);
const TaxiDriverBusinessDetails = require('../../model/taxi_driver_business_details')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const Brands = require('../../model/brands')(sequelize, DataTypes);
const Models = require('../../model/models')(sequelize, DataTypes);
const ActivityVehicleDetails = require('../../model/activity_vehicle_details')(sequelize, DataTypes);
const ActivityAdventureTypes = require('../../model/activity_adventure_types')(sequelize, DataTypes);
const RentalActivities = require('../../model/rental_activities')(sequelize, DataTypes);
const ActivityMedia = require('../../model/activity_media')(sequelize, DataTypes);
const ActivityPrices = require('../../model/activity_prices')(sequelize, DataTypes);
const ActivityRequireAccessories = require('../../model/activity_require_accessories')(sequelize, DataTypes);
const ActivityAddOns = require('../../model/activity_add_ons')(sequelize, DataTypes);
const AdventureActivities = require('../../model/adventure_activities')(sequelize, DataTypes);
const ActivityMeetingPoints = require('../../model/activity_meeting_points')(sequelize, DataTypes);
const ActivityTimeSheets = require('../../model/activity_time_sheets')(sequelize, DataTypes);
const ActivityAutoTimeSheets = require('../../model/activity_auto_time_sheets')(sequelize, DataTypes);
const ActivityFlexdTimeSheets = require('../../model/activity_flexd_time_sheets')(sequelize, DataTypes);
const ActivityTimeSheetTimes = require('../../model/activity_time_sheet_times')(sequelize, DataTypes);
const ActivityDaySheets = require('../../model/activity_day_sheets')(sequelize, DataTypes);
const ActivityDaySheetDays = require('../../model/activity_day_sheet_days')(sequelize, DataTypes);
const ActivityAdventureListDates = require('../../model/activity_adventure_list_dates')(sequelize, DataTypes);
const Bookings = require('../../model/bookings')(sequelize, DataTypes);
const BookingAddOns = require('../../model/booking_add_ons')(sequelize, DataTypes);
const RazorpayCustomer = require('../../model/razorpay_customers')(sequelize, DataTypes);
const BookingPayments = require('../../model/booking_payments')(sequelize, DataTypes);
const Transactions = require('../../model/transactions')(sequelize, DataTypes);
const TaxiBookings = require('../../model/taxi_bookings')(sequelize, DataTypes);
const RatingReviews = require('../../model/rating_reviews')(sequelize, DataTypes);

RentalActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

Users.hasOne(vendorBusinessDetails, {
    foreignKey: 'user_id'
});

Users.hasOne(TaxiDriverBusinessDetails, {
    foreignKey: 'user_id'
});

RentalActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

RentalActivities.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

RentalActivities.belongsTo(Models, {
    foreignKey: 'model_id'
});

RentalActivities.hasMany(ActivityVehicleDetails, {
    foreignKey: 'activity_share_fk'
});

RentalActivities.hasMany(ActivityMedia, {
    foreignKey: 'activity_share_fk'
});

RentalActivities.hasMany(ActivityPrices, {
    foreignKey: 'activity_share_fk'
});

RentalActivities.hasMany(ActivityRequireAccessories, {
    foreignKey: 'activity_share_fk'
});

RentalActivities.hasMany(ActivityAddOns, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

AdventureActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

AdventureActivities.belongsTo(ActivityAdventureTypes, {
    foreignKey: 'activity_adventure_type_id'
});

AdventureActivities.hasMany(ActivityMedia, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.hasMany(ActivityPrices, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.hasMany(ActivityRequireAccessories, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.hasMany(ActivityAddOns, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.hasOne(ActivityMeetingPoints, {
    foreignKey: 'adventure_activity_id'
}); 

AdventureActivities.hasOne(ActivityTimeSheets, {
    foreignKey: 'adventure_activity_id'
}); 

ActivityTimeSheets.belongsTo(AdventureActivities, {
    foreignKey: 'adventure_activity_id'
}); 

ActivityTimeSheets.hasOne(ActivityAutoTimeSheets, {
    foreignKey: 'activity_time_sheet_id'
});

ActivityTimeSheets.hasOne(ActivityFlexdTimeSheets, {
    foreignKey: 'activity_time_sheet_id'
});

ActivityTimeSheets.hasMany(ActivityTimeSheetTimes, {
    foreignKey: 'activity_time_sheet_id'
});

ActivityTimeSheetTimes.belongsTo(ActivityTimeSheets, {
    foreignKey: 'activity_time_sheet_id'
});

AdventureActivities.hasOne(ActivityDaySheets, {
    foreignKey: 'adventure_activity_id'
});

ActivityDaySheets.belongsTo(AdventureActivities, {
    foreignKey: 'adventure_activity_id'
});

ActivityDaySheets.hasMany(ActivityDaySheetDays, {
    foreignKey: 'activity_day_sheet_id'
});

AdventureActivities.hasMany(ActivityAdventureListDates, {
    foreignKey: 'adventure_activity_id'
});

Bookings.belongsTo(Users, {
    foreignKey: 'user_id'
});

Bookings.hasMany(BookingAddOns, {
    foreignKey: 'booking_id'
});

BookingAddOns.belongsTo(ActivityAddOns, {
    foreignKey: 'activity_add_on_id'
});

Bookings.hasOne(BookingPayments, {
    foreignKey: 'booking_id'
});

Bookings.belongsTo(AdventureActivities, {
    foreignKey: 'activity_share_fk'
});

Bookings.belongsTo(RentalActivities, {
    foreignKey: 'activity_share_fk'
});

Bookings.belongsTo(ActivityTimeSheetTimes, {
    foreignKey: 'activity_slot_sheet_share_fk'
});

Bookings.belongsTo(ActivityDaySheets, {
    foreignKey: 'activity_slot_sheet_share_fk'
});

TaxiBookings.belongsTo(Users, {
    foreignKey: 'user_id'
});

TaxiBookings.belongsTo(Users, {
    foreignKey: 'driver_id',
    as :'driver'
});

Bookings.hasOne(RatingReviews, {
    foreignKey: 'booking_id'
});

Bookings.hasOne(BookingPayments, {
    foreignKey: 'booking_id'
});

BookingPayments.hasMany(Transactions, {
    foreignKey: 'booking_payment_id'
});

TaxiBookings.hasOne(RatingReviews, {
    foreignKey: 'taxi_booking_id'
});

TaxiBookings.hasOne(BookingPayments, {
    foreignKey: 'taxi_booking_id'
});

BookingPayments.hasMany(Transactions, {
    foreignKey: 'booking_payment_id'
});

const controller = {};

/**
 * @params:      
 * @purpose:     To view vendor (Adventure) activities listning
*/
controller.vendorAdventureActivitiesIndex = async (req, res) => {
    await AdventureActivities.findAll({attributes: ['id', 'title', 'level', 'is_approved', 'status'], order: [['id', 'DESC']], include:[
        {model: Activities, attributes: ['title']},
        {model: Users, attributes: ['email', 'country_code', 'mobile_no']},
        {model: ActivityPrices, where: { activity_share_type: '1', no_of_person: 1 }, required: false},
    ] }).then(data => {
        return res.render('manageVendorActivities/adventure/index', {data: data, stackScript: '../partials/script/index', customScript: '../partials/script/addNewAdventureAmount', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To get (Adventure) activity price list
*/
controller.getAdventureActivityPriceList = async (req, res) => {
    await ActivityPrices.findAll({where: {activity_share_fk: req.params.activity_id, activity_share_type: '1', rate_type: '3'}}).then(data => {
        return res.json({'status': true, 'data': data});
    }).catch(err => {
        return res.json({'status': false});
    });
    
}

/**
 * @params:      id
 * @purpose:     To add (Adventure) activity new amount
*/
controller.addNewAdventureActivityAmount = async (req, res) => {
    try{
        var result =  req.body.id.map( (v, i) => ( {[v]: req.body.amount[i]} ) );
        for await (const [index, val] of result.entries()) {
            await ActivityPrices.update({admin_amount: Object.values(val)[0], amount: Object.values(val)[0]}, {where: {id: Object.keys(val)[0], activity_share_type: '1', rate_type: '3'}});
        }
        req.toastr.success("Amount added successfully.");
        return res.redirect('back');
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To create (Adventure) activity discount form
*/
controller.createAdventureActivityDiscount = async (req, res) => {
    await AdventureActivities.findOne({attributes: ['id', 'discount'], where: {id: req.params.id, is_approved: '1'}}).then(data => {
        return res.json({'status': true, 'data': data});
    }).catch(err => {
        return res.json({'status': false});
    }); 
}

/**
 * @params:      id
 * @purpose:     To store (Adventure) activity discount
*/
controller.storeAdventureActivityDiscount = async (req, res) => {
    await AdventureActivities.update({discount: req.body.discount}, {where: {id: req.body.id, is_approved: '1'}}).then(async function (data) {
        var getData = await AdventureActivities.findOne({
            attributes: ['id', 'discount'],
            where: {id: req.body.id, is_approved: '1'},
            include: [{model: ActivityPrices, attributes: ['id', 'admin_amount', 'rate_type'], where: {activity_share_type: '1', rate_type: '3' } }]
        });
        for await (const [i, val] of getData?.activity_prices.entries()) {
            let finalAmount = val.admin_amount - (val.admin_amount * getData.discount / 100);
            await ActivityPrices.update({amount: finalAmount}, {where: {id: val.id, activity_share_fk: req.body.id, activity_share_type: '1', rate_type: val.rate_type } });
        }
        req.toastr.success("Discount added successfully.");
        return res.redirect('back');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });  
}

/**
 * @params:      id
 * @purpose:     To view (Adventure) activity detail
*/
controller.vendorAdventureActivitiesView = async (req, res) => {
    await AdventureActivities.findOne({where: {id: req.params.id}, include:[
        {model: Activities},
        {model: ActivityAdventureTypes},
        {model: Users, 
            attributes: ['first_name', 'last_name', 'email', 'country_code', 'mobile_no', 'country', 'state', 'city', 'image'],
            include: [{model: vendorBusinessDetails, attributes: ['business_name', 'aletrnate_mobile_no', 'location', 'latitude', 'longitude', 'gst_no']}]},
        {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
        {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
        {model: ActivityRequireAccessories, where: { activity_share_type: '1' }, required: false}, 
        {model: ActivityAddOns, where: { activity_share_type: '1' }, required: false},
        {model: ActivityMeetingPoints},
        {model: ActivityTimeSheets, include: [{model: ActivityAutoTimeSheets}, {model: ActivityFlexdTimeSheets}, {model: ActivityTimeSheetTimes}]},
        {model: ActivityDaySheets, include: [{model: ActivityDaySheetDays}]},
        {model: ActivityAdventureListDates},
    ] }).then(val => {
        let videoData = val.activity_media?.find(v => v.media_type == '2');
        let newData = {
            id: val.id,
            title: val.title,
            level: val.level,
            altitude_depth_height: val.altitude_depth_height,
            age_from: val.age_from,
            age_to: val.age_to,
            language: val.language,
            description: val.description,
            warning: val.warning,
            activity_type: val.activity_type,
            is_pickup: val.is_pickup,
            is_website: val.is_website,
            website_link: val.website_link,
            single_day_categories: val.single_day_categories,
            is_provide_all_parts: val.is_provide_all_parts,
            is_approved: val.is_approved,
            status: val.status,
            meeting_point_id: val?.activity_meeting_point?.id,
            is_extra_charges: val?.activity_meeting_point?.is_extra_charges,
            address_line_one: val?.activity_meeting_point?.address_line_one,
            address_line_two: val?.activity_meeting_point?.address_line_two,
            landmark: val?.activity_meeting_point?.landmark,
            country: val?.activity_meeting_point?.country,
            state: val?.activity_meeting_point?.state,
            city: val?.activity_meeting_point?.city,
            pin_code: val?.activity_meeting_point?.pin_code,
            latitude: val?.activity_meeting_point?.latitude,
            longitude: val?.activity_meeting_point?.longitude,
            location: val?.activity_meeting_point?.location,
            activity: {
                id: val.activity.id,
                title: val.activity.title,
                status: val.activity.status,
            },
            activity_adventure_type: {
                id: val.activity_adventure_type.id,
                name: val.activity_adventure_type.name,
                status: val.activity_adventure_type.status
            },
            user: {
                first_name: val.user.first_name,
                last_name: val.user.last_name,
                email: val.user.email,
                country_code: val.user.country_code,
                mobile_no: val.user.mobile_no,
                country: val.user.country,
                state: val.user.state,
                city: val.user.city,
                image: val.user.image,
                vendor_business_detail: {
                    business_name: val.user.vendor_business_detail.business_name,
                    aletrnate_mobile_no: val.user.vendor_business_detail.aletrnate_mobile_no,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
                    gst_no: val.user.vendor_business_detail.gst_no,
                }
            },
            images: val?.activity_media?.filter(v => v.media_type == '1').map(v => {
                return {
                    id: v.id,
                    media_path: v.media_path,
                    status: v.status
                }
            }),
            video: videoData ? {
                id: videoData.id,
                media_path: videoData.media_path,
                status: videoData.status
            } : null,
            price: val?.activity_prices?.filter(v => v.rate_type == '3').map(v => {
                return {
                    id: v.id,
                    no_of_person: v.no_of_person,
                    vendor_amount: v.vendor_amount,
                    admin_amount: v.admin_amount,
                    amount: v.amount,
                    status: v.status
                }
            }),
            what_to_take: val?.activity_require_accessories?.filter(v => v.accessories_medium == '1').map(v => {
                return {
                    id: v.id,
                    name: v.name,
                    status: v.status
                }
            }),
            thing_service_included: val?.activity_require_accessories?.filter(v => v.accessories_medium == '2').map(v => {
                return {
                    id: v.id,
                    name: v.name,
                    status: v.status
                }
            }),
            add_ons: val?.activity_add_ons?.map(v => {
                return {
                    id: v.id,
                    item: v.item_name,
                    price: v.item_price,
                    quantity: v.quantity,
                    status: v.status
                }
            }),
            list_date: val?.activity_adventure_list_dates?.map(v => {
                return {
                    id: v.id,
                    start_date: v.start_date,
                    end_date: v.end_date,
                    status: v.status
                }
            }),
        }
        if(val?.activity_time_sheet) {
            let ATS = val.activity_time_sheet;
            newData.activity_type_data = {
                activity_time_sheet_id: ATS.id,
                slot_type: ATS.slot_type,
                slot: ATS.activity_time_sheet_times?.map(v => {
                    return {
                        activity_time_sheet_times_id: v.id,
                        start_time: v.start_time,
                        end_time: v.end_time,
                        quantity: v.quantity,
                        status: v.status
                    }
                }),
            }
            if(ATS.activity_auto_time_sheet) {
                newData.activity_type_data.auto = {
                    activity_auto_time_sheet_id: ATS.activity_auto_time_sheet.id,   
                    start_time: ATS.activity_auto_time_sheet.start_time,   
                    slot_time_duration: ATS.activity_auto_time_sheet.slot_time_duration,   
                    day_slot: ATS.activity_auto_time_sheet.day_slot,   
                    time_slot: ATS.activity_auto_time_sheet.time_slot
                }
            } else if (ATS.activity_flexd_time_sheet) {
                newData.activity_type_data.flexd = {
                    activity_flexd_time_sheet_id: ATS.activity_flexd_time_sheet.id,   
                    duration: ATS.activity_flexd_time_sheet.duration,   
                    start_time: ATS.activity_flexd_time_sheet.start_time,   
                    day_quantity: ATS.activity_flexd_time_sheet.day_quantity,   
                    duration_quantity: ATS.activity_flexd_time_sheet.duration_quantity,
                    itinerary: ATS.activity_flexd_time_sheet.itinerary
                }
            }
        }
        if(val?.activity_day_sheet) {
            let ADS = val.activity_day_sheet;
            newData.activity_type_data = {
                activity_day_sheet_id: ADS.id,
                duration: ADS.duration,
                start_date: ADS.start_date,
                no_of_spot: ADS.no_of_spot,
                start_time: ADS.start_time,
                end_time: ADS.end_time,
                itinerary: ADS.activity_day_sheet_days?.map(v => {
                    return {
                        activity_day_sheet_days_id: v.id,
                        day: v.day,
                        itinerary: v.itinerary,
                        copy_day_sheet_day_id: v.copy_day_sheet_day_id,
                    }
                }),
            }
        }
        var getDaysArray = (year, month) => {
            const monthIndex = month - 1;
            var currentMonth = moment().format("MMM");
            var currentDate = moment().format("DD");
            const date = new Date(year, monthIndex, currentDate);
            const result = [];
            while (date.getMonth() === monthIndex) {
                result.push(date.getDate() + '-' + currentMonth);
                date.setDate(date.getDate() + 1);
            }
            return result;
        }
        var currentYear = moment().format("YYYY");
        var currentMonth = moment().format("MM");
        var dateList = getDaysArray(currentYear, currentMonth);
        return res.render('manageVendorActivities/adventure/view', {data: newData, dateList: dateList, stackScript: '../partials/script/vendorActivity'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To (Adventure) activity approved
*/
controller.vendorAdventureActivitiesIsApproved = async (req, res) => {
    let isApproved = req.body.is_approved == '1' ? '0' : '1';
    await AdventureActivities.update({is_approved: isApproved}, {where: {id: req.params.id}});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To (Adventure) activity update status
*/
controller.vendorAdventureActivitiesUpdateStatus = async (req, res) => {
    let status = req.body.status == '1' ? '0' : '1';
    await AdventureActivities.update({status: status}, {where: {id: req.params.id}});
    return res.redirect('back');
}

/**
 * @params:      
 * @purpose:     To view vendor (Rental) activities listning
*/
controller.vendorRentalActivitiesIndex = async (req, res) => {
    await RentalActivities.findAll({attributes: ['id', 'title', 'quantity', 'is_approved', 'status'], order: [['id', 'DESC']], include:[
        {model: Activities, attributes: ['id', 'title']},
        {model: Users, attributes: ['email', 'country_code', 'mobile_no']},
        {model: Brands, attributes: ['id', 'name']},
        {model: Models, attributes: ['id', 'name', 'type']},
        {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
    ]}).then(data => {
        var newData = [];
        data.forEach(val => {
            let perHourData = val?.activity_prices.find(v => v.rate_type == '1');
            let perDayData = val?.activity_prices.find(v => v.rate_type == '2');
            newData.push({
                id: val.id,
                title: val.title,
                quantity: val.quantity,
                is_approved: val.is_approved,
                status: val.status,
                activity: {
                    id: val.activity.id,
                    title: val.activity.title,
                },
                user: {
                    email: val.user.email,
                    country_code: val.user.country_code,
                    mobile_no: val.user.mobile_no,
                },
                brand: {
                    id: val.brand.id,
                    name: val.brand.name,
                },
                model: {
                    id: val.model.id,
                    name: val.model.name,
                    type: val.model.type,
                },
                price: {
                    per_hour: {
                        id: perHourData.id,
                        admin_amount: perHourData.admin_amount,
                        amount: perHourData.amount
                    }, 
                    per_day: {
                        id: perDayData.id,
                        admin_amount: perDayData.admin_amount,
                        amount: perDayData.amount
                    }
                },
            })
        });
        return res.render('manageVendorActivities/rental/index', {data: newData, stackScript: '../partials/script/index', customScript: '../partials/script/addNewRentalAmount', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To get (Rental) activity price list
*/
controller.getRentalActivityPriceList = async (req, res) => {
    await ActivityPrices.findAll({where: { activity_share_fk: req.params.activity_id, activity_share_type: '2', rate_type: {$in: ['1','2']} } }).then(data => {
        return res.json({'status': true, 'data': data});
    }).catch(err => {
        return res.json({'status': false});
    });  
}

/**
 * @params:      id
 * @purpose:     To add (Rental) activity new amount
*/
controller.addNewRentalActivityAmount = async (req, res) => {
    try{
        var result =  req.body.id.map( (v, i) => ( {[v]: req.body.amount[i]} ) );
        for await (const [index, val] of result.entries()) {
            await ActivityPrices.update({admin_amount: Object.values(val)[0], amount: Object.values(val)[0]}, {where: {id: Object.keys(val)[0], activity_share_type: '2', rate_type: {$in: ['1','2']} } });
        }
        req.toastr.success("Amount added successfully.");
        return res.redirect('back');
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To create (Rental) activity discount form
*/
controller.createRentalActivityDiscount = async (req, res) => {
    await RentalActivities.findOne({attributes: ['id', 'discount'], where: {id: req.params.id, is_approved: '1'}}).then(data => {
        return res.json({'status': true, 'data': data});
    }).catch(err => {
        return res.json({'status': false});
    }); 
}

/**
 * @params:      id
 * @purpose:     To store (Rental) activity discount
*/
controller.storeRentalActivityDiscount = async (req, res) => {
    await RentalActivities.update({discount: req.body.discount}, {where: {id: req.body.id, is_approved: '1'}}).then(async function (data) {
        var getData = await RentalActivities.findOne({
            attributes: ['id', 'discount'],
            where: {id: req.body.id, is_approved: '1'},
            include: [{model: ActivityPrices, attributes: ['id', 'admin_amount', 'rate_type'], where: {activity_share_type: '2', rate_type: {$in: ['1','2']} } }]
        });
        for await (const [i, val] of getData?.activity_prices.entries()) {
            let finalAmount = val.admin_amount - (val.admin_amount * getData.discount / 100);
            await ActivityPrices.update({amount: finalAmount}, {where: {id: val.id, activity_share_fk: req.body.id, activity_share_type: '2', rate_type: val.rate_type } });
        }
        req.toastr.success("Discount added successfully.");
        return res.redirect('back');
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });  
}

/**
 * @params:      id
 * @purpose:     To view (Rental) activity detail
*/
controller.vendorRentalActivitiesView = async (req, res) => {
    await RentalActivities.findOne({
        attributes: ['id', 'title', 'quantity', 'description', 'warning', 'is_approved', 'status'],
        where: {id: req.params.id}, include:[
        {model: Activities, attributes: ['id', 'title']},
        {model: Users, 
            attributes: ['first_name', 'last_name', 'email', 'country_code', 'mobile_no', 'country', 'state', 'city', 'image'],
            include: [
                {model: vendorBusinessDetails, attributes: ['business_name', 'aletrnate_country_code', 'aletrnate_mobile_no', 'location', 'latitude', 'longitude', 'gst_no']}
            ]
        },
        {model: Brands, attributes: ['id', 'name']},
        {model: Models, attributes: ['id', 'name', 'type']},
        {model: ActivityVehicleDetails, where: { activity_share_type: '2' }, required: false},
        {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
        {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
        {model: ActivityRequireAccessories, where: { activity_share_type: '2' }, required: false}, 
        {model: ActivityAddOns, where: { activity_share_type: '2' }, required: false}
    ] }).then(val => {
            let videoData = val?.activity_media?.find(v => v.media_type == '2');
            let perHourData = val?.activity_prices?.find(v => v.rate_type == '1');
            let perDayData = val?.activity_prices?.find(v => v.rate_type == '2');
            var data = {
                id: val.id,
                title: val.title,
                quantity: val.quantity,
                description: val.description,
                warning: val.warning,
                is_approved: val.is_approved,
                status: val.status,
                activity: {
                    id: val.activity.id,
                    title: val.activity.title
                },
                user: {
                    first_name: val.user.first_name,
                    last_name: val.user.last_name,
                    email: val.user.email,
                    country_code: val.user.country_code,
                    mobile_no: val.user.mobile_no,
                    country: val.user.country,
                    state: val.user.state,
                    city: val.user.city,
                    image: val.user.image,
                    vendor_business_detail: {
                        business_name: val.user?.vendor_business_detail.business_name,
                        aletrnate_country_code: val.user?.vendor_business_detail.aletrnate_country_code,
                        aletrnate_mobile_no: val.user?.vendor_business_detail.aletrnate_mobile_no,
                        location: val.user?.vendor_business_detail.location,
                        latitude: val.user?.vendor_business_detail.latitude,
                        longitude: val.user?.vendor_business_detail.longitude,
                        gst_no: val.user?.vendor_business_detail.gst_no,
                    }
                },
                brand: {
                    id: val.brand.id,
                    name: val.brand.name
                },
                model: {
                    id: val.model.id,
                    name: val.model.name,
                    type: val.model.type
                },
                vehicle_details: val?.activity_vehicle_details?.map(v => {
                    return {
                        id: v.id,
                        year: v.year,
                        registration_no: v.registration_no
                    }
                }),
                images: val?.activity_media?.filter(v => v.media_type == '1').map(v => {
                    return {
                        id: v.id,
                        media_path: v.media_path
                    }
                }),
                video: videoData ? {
                    id: videoData.id,
                    media_path: videoData.media_path
                } : null,
                price: {
                    per_hour: {
                        id: perHourData.id,
                        vendor_amount: perHourData.vendor_amount,
                        admin_amount: perHourData.admin_amount,
                        amount: perHourData.amount
                    }, 
                    per_day: {
                        id: perDayData.id,
                        vendor_amount: perDayData.vendor_amount,
                        admin_amount: perDayData.admin_amount,
                        amount: perDayData.amount
                    }
                },
                what_to_take: val?.activity_require_accessories?.filter(v => v.accessories_medium == '1').map(v => {
                    return {
                        id: v.id,
                        name: v.name
                    }
                }),
                thing_service_included: val?.activity_require_accessories?.filter(v => v.accessories_medium == '2').map(v => {
                    return {
                        id: v.id,
                        name: v.name
                    }
                }),
                add_ons: val?.activity_add_ons?.map(v => {
                    return {
                        id: v.id,
                        item: v.item_name,
                        price: v.item_price,
                        quantity: v.quantity
                    }
                }),
            }
        return res.render('manageVendorActivities/rental/view', {data: data, stackScript: '../partials/script/vendorActivity'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To (Rental) activity approved
*/
controller.vendorRentalActivitiesIsApproved = async (req, res) => {
    let isApproved = req.body.is_approved == '1' ? '0' : '1';
    await RentalActivities.update({is_approved: isApproved}, {where: {id: req.params.id}});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To (Rental) activity update status
*/
controller.vendorRentalActivitiesUpdateStatus = async (req, res) => {
    let status = req.body.status == '1' ? '0' : '1';
    await RentalActivities.update({status: status}, {where: {id: req.params.id}});
    return res.redirect('back');
}

/**
 * @params:      id
 * @purpose:     To get all bookings
*/
controller.bookingsIndex = async (req, res) => {
    await Bookings.findAll({ order: [['id', 'DESC']], include:[
        {model: Users},
    ] }).then(bookings => {
        return res.render('bookings/index', {bookings: bookings, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view bookings detail
*/
controller.viewBookingsDetail = async (req, res) => {
    await Bookings.findOne({where: {id: req.params.id}, include:[
        {model: Users},
        {model: BookingAddOns, include: [{model: ActivityAddOns}]},
        {model: BookingPayments},
        {model: AdventureActivities, where: { '$bookings.activity_share_type$' : '1' }, required: false,
            include: [
                {model: Users, include: [{model: vendorBusinessDetails}]},
                {model: Activities},
                {model: ActivityAdventureTypes},
                {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '1' }, required: false},
                {model: ActivityRequireAccessories, where: { activity_share_type: '1' }, required: false},
                {model: ActivityAddOns, where: { activity_share_type: '1' }, required: false},
                {model: ActivityMeetingPoints},
                {model: ActivityAdventureListDates},
            ]
        },
        {model: ActivityTimeSheetTimes, where: { '$bookings.activity_share_type$' : '1' }, include: [
            {model: ActivityTimeSheets, 
                include: [{model: AdventureActivities, where: {activity_type: "1"}, required: true}], 
                required: false
            },
        ], required: false},
        {model: ActivityDaySheets, where: { '$bookings.activity_share_type$' : '1' }, include: [
            {model: AdventureActivities, where: {activity_type: "2"}, required: true},
        ], required: false},
        {model: RentalActivities, where: { '$bookings.activity_share_type$' : '2' }, required: false,
            include: [
                {model: Users, include: [{model: vendorBusinessDetails}]},
                {model: Activities},
                {model: Brands},
                {model: Models},
                {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
                {model: ActivityRequireAccessories, where: { activity_share_type: '2' }, required: false}, 
                {model: ActivityAddOns, where: { activity_share_type: '2' }, required: false}
            ]
        },
        {model: RatingReviews},
        {model: BookingPayments, include: [{model: Transactions}]}
    ] }).then(data => {
        return res.render('bookings/viewBookingDetail', {data: data});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To get booking all Transactions
*/
controller.allTransactions = async (req, res) => {
    await Transactions.findAll({ order: [['id', 'DESC']] }).then(allTransactions => {
        return res.render('bookings/allTransactions', {allTransactions: allTransactions, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      Request, id
 * @purpose:     To get all taxi bookings
*/
controller.taxiBookingsIndex = async (req, res) => {
    await TaxiBookings.findAll({ 
        order: [['id', 'DESC']], 
        include:[
            {model: Users, attributes: ['id', 'email', 'country_code', 'mobile_no']}, 
            {model: Users, as:'driver', attributes: ['id', 'email', 'country_code', 'mobile_no'], 
                include:[
                    {model: TaxiDriverBusinessDetails, attributes: ['id', 'registration_no']}
                ]
            }
        ] 
    }).then(taxiBookings => {
        return res.render('bookings/taxiIndex', {taxiBookings: taxiBookings, stackScript: '../partials/script/index', stackLink: '../partials/link/index'});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      id
 * @purpose:     To view taxi bookings detail
*/
controller.taxiBookingsDetail = async (req, res) => {
    await TaxiBookings.findOne({where: {id: req.params.id}, 
        include:[
            {model: Users},
            {model: Users, as:'driver',
                include:[
                    {model: TaxiDriverBusinessDetails}
                ]
            },
            {model: RatingReviews},
            {model: BookingPayments, include: [{model: Transactions}]}
        ] 
    }).then(data => {
        return res.render('bookings/viewTaxiBookingDetail', {data: data});
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

module.exports = controller;