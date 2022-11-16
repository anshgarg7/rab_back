const fs = require("fs");
const statusCol = ['deactive','active'];
const { validationResult } = require('express-validator');

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const vendorBusinessDetails = require('../../model/vendor_business_details')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const ActivityAdventureTypes = require('../../model/activity_adventure_types')(sequelize, DataTypes);
const Brands = require('../../model/brands')(sequelize, DataTypes);
const Models = require('../../model/models')(sequelize, DataTypes);
const RentalActivities = require('../../model/rental_activities')(sequelize, DataTypes);
const RentalActivityHistories = require('../../model/rental_activity_histories')(sequelize, DataTypes);
const ActivityVehicleDetails = require('../../model/activity_vehicle_details')(sequelize, DataTypes);
const ActivityVehicleDetailHistories = require('../../model/activity_vehicle_detail_histories')(sequelize, DataTypes);
const ActivityMedia = require('../../model/activity_media')(sequelize, DataTypes);
const ActivityMediaHistories = require('../../model/activity_media_histories')(sequelize, DataTypes);
const ActivityPrices = require('../../model/activity_prices')(sequelize, DataTypes);
const ActivityPriceHistories = require('../../model/activity_price_histories')(sequelize, DataTypes);
const ActivityRequireAccessories = require('../../model/activity_require_accessories')(sequelize, DataTypes);
const ActivityRequireAccessoryHistories = require('../../model/activity_require_accessory_histories')(sequelize, DataTypes);
const ActivityAddOns = require('../../model/activity_add_ons')(sequelize, DataTypes);
const ActivityAddOnHistories = require('../../model/activity_add_on_histories')(sequelize, DataTypes);
const AdventureActivities = require('../../model/adventure_activities')(sequelize, DataTypes);
const AdventureActivityHistories = require('../../model/adventure_activity_histories')(sequelize, DataTypes);
const ActivityMeetingPoints = require('../../model/activity_meeting_points')(sequelize, DataTypes);
const ActivityMeetingPointHistories = require('../../model/activity_meeting_point_histories')(sequelize, DataTypes);
const ActivityTimeSheets = require('../../model/activity_time_sheets')(sequelize, DataTypes);
const ActivityTimeSheetHistories = require('../../model/activity_time_sheet_histories')(sequelize, DataTypes);
const ActivityAutoTimeSheets = require('../../model/activity_auto_time_sheets')(sequelize, DataTypes);
const ActivityAutoTimeSheetHistories = require('../../model/activity_auto_time_sheet_histories')(sequelize, DataTypes);
const ActivityFlexdTimeSheets = require('../../model/activity_flexd_time_sheets')(sequelize, DataTypes);
const ActivityFlexdTimeSheetHistories = require('../../model/activity_flexd_time_sheet_histories')(sequelize, DataTypes);
const ActivityTimeSheetTimes = require('../../model/activity_time_sheet_times')(sequelize, DataTypes);
const ActivityTimeSheetTimeHistories = require('../../model/activity_time_sheet_time_histories')(sequelize, DataTypes);
const ActivityDaySheets = require('../../model/activity_day_sheets')(sequelize, DataTypes);
const ActivityDaySheetHistories = require('../../model/activity_day_sheet_histories')(sequelize, DataTypes);
const ActivityDaySheetDays = require('../../model/activity_day_sheet_days')(sequelize, DataTypes);
const ActivityDaySheetDayHistories = require('../../model/activity_day_sheet_day_histories')(sequelize, DataTypes);
const ActivityAdventureListDates = require('../../model/activity_adventure_list_dates')(sequelize, DataTypes);
const ActivityAdventureListDateHistories = require('../../model/activity_adventure_list_date_histories')(sequelize, DataTypes);
const Bookings = require('../../model/bookings')(sequelize, DataTypes);
const BookingAddOns = require('../../model/booking_add_ons')(sequelize, DataTypes);
const BookingPayments = require('../../model/booking_payments')(sequelize, DataTypes);
const RatingReviews = require('../../model/rating_reviews')(sequelize, DataTypes);
const Transactions = require('../../model/transactions')(sequelize, DataTypes);

RentalActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

RentalActivityHistories.belongsTo(Users, {
    foreignKey: 'user_id'
});

Users.hasOne(vendorBusinessDetails, {
    foreignKey: 'user_id'
});

RentalActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

RentalActivityHistories.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

RentalActivities.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

RentalActivityHistories.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

RentalActivities.belongsTo(Models, {
    foreignKey: 'model_id'
});

RentalActivityHistories.belongsTo(Models, {
    foreignKey: 'model_id'
});

RentalActivities.hasMany(ActivityVehicleDetails, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityVehicleDetailHistories, {
    foreignKey: 'activity_share_history_fk'
});

RentalActivities.hasMany(ActivityMedia, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityMediaHistories, {
    foreignKey: 'activity_share_history_fk'
});

RentalActivities.hasMany(ActivityPrices, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityPriceHistories, {
    foreignKey: 'activity_share_history_fk'
});

RentalActivities.hasMany(ActivityRequireAccessories, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityRequireAccessoryHistories, {
    foreignKey: 'activity_share_history_fk'
});

RentalActivities.hasMany(ActivityAddOns, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityAddOnHistories, {
    foreignKey: 'activity_share_history_fk'
});

AdventureActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

AdventureActivities.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

AdventureActivityHistories.belongsTo(Activities, {
    foreignKey: 'activity_id'
});

AdventureActivities.belongsTo(ActivityAdventureTypes, {
    foreignKey: 'activity_adventure_type_id'
});

AdventureActivityHistories.belongsTo(ActivityAdventureTypes, {
    foreignKey: 'activity_adventure_type_id'
});

Activities.hasOne(ActivityAdventureTypes, {
    foreignKey: 'activity_id'
});

AdventureActivities.hasMany(ActivityMedia, {
    foreignKey: 'activity_share_fk'
});

AdventureActivityHistories.hasMany(ActivityMediaHistories, {
    foreignKey: 'activity_share_history_fk'
});

AdventureActivities.hasMany(ActivityPrices, {
    foreignKey: 'activity_share_fk'
});

AdventureActivityHistories.hasMany(ActivityPriceHistories, {
    foreignKey: 'activity_share_history_fk'
});

AdventureActivities.hasMany(ActivityRequireAccessories, {
    foreignKey: 'activity_share_fk'
});

AdventureActivityHistories.hasMany(ActivityRequireAccessoryHistories, {
    foreignKey: 'activity_share_history_fk'
});

AdventureActivities.hasMany(ActivityAddOns, {
    foreignKey: 'activity_share_fk'
});

AdventureActivityHistories.hasMany(ActivityAddOnHistories, {
    foreignKey: 'activity_share_history_fk'
});

AdventureActivities.hasOne(ActivityMeetingPoints, {
    foreignKey: 'adventure_activity_id'
}); 

AdventureActivityHistories.hasOne(ActivityMeetingPointHistories, {
    foreignKey: 'adventure_activity_history_id'
}); 

AdventureActivities.hasMany(ActivityTimeSheets, {
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

AdventureActivities.hasMany(ActivityDaySheets, {
    foreignKey: 'adventure_activity_id'
});

ActivityDaySheets.hasMany(ActivityDaySheetDays, {
    foreignKey: 'activity_day_sheet_id'
});

AdventureActivities.hasMany(ActivityAdventureListDates, {
    foreignKey: 'adventure_activity_id'
});

AdventureActivityHistories.hasMany(ActivityAdventureListDateHistories, {
    foreignKey: 'adventure_activity_history_id'
});

Bookings.belongsTo(Users, {
    foreignKey: 'user_id'
});

Bookings.belongsTo(AdventureActivities, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.hasMany(Bookings, {
    foreignKey: 'activity_share_fk'
});

ActivityTimeSheetTimes.hasMany(Bookings, {
    foreignKey: 'activity_slot_sheet_share_fk'
});

Bookings.belongsTo(RentalActivities, {
    foreignKey: 'activity_share_fk'
});

RentalActivities.hasMany(Bookings, {
    foreignKey: 'activity_share_fk'
});

Bookings.belongsTo(RentalActivityHistories, {
    foreignKey: 'activity_share_fk'
});

Bookings.belongsTo(AdventureActivityHistories, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(Bookings, {
    foreignKey: 'activity_share_fk'
});

Bookings.hasMany(BookingAddOns, {
    foreignKey: 'booking_id'
});

ActivityAddOns.hasMany(BookingAddOns, {
    foreignKey: 'activity_add_on_id'
});

ActivityAddOnHistories.hasMany(BookingAddOns, {
    foreignKey: 'activity_add_on_id',
    targetKey: "activity_add_on_id",
});

BookingAddOns.belongsTo(ActivityAddOns, {
    foreignKey: 'activity_add_on_id'
});

BookingAddOns.belongsTo(Bookings, {
    foreignKey: 'booking_id'
});

Bookings.hasOne(BookingPayments, {
    foreignKey: 'booking_id'
});

Bookings.hasOne(RatingReviews, {
    foreignKey: 'booking_id'
});

let controller = {};

/**
 * @params:      
 * @purpose:     To get activities by vendor selected category
*/
controller.getActivitiesByVendorSelectedCategory  = async (req, res) => {
    await Activities.findAll({where: {status: '1', category_id: req.decoded_data.vendor_business_detail.category_id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Activities fetch successfully.',
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
 * @params:      activity_id
 * @purpose:     To get (Adventure) activity types
*/
controller.getAdvantureActivityTypes  = async (req, res) => {
    await ActivityAdventureTypes.findAll({where: {status: '1', activity_id: req.params.activity_id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Activity types fetch successfully.',
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
 * @purpose:     To get (Rental) activities
*/
controller.rentalActivities  = async (req, res) => {
    await RentalActivities.findAll({
        attributes: ['id', 'title', 'level', 'quantity', 'is_approved', 'status'],
        where: {user_id: req.decoded_data.id}, 
            include:[
                {model: Activities, attributes: ['title']},
                {model: Brands, attributes: ['name']},
                {model: Models, attributes: ['name', 'type']},
                {model: ActivityVehicleDetails, attributes: ['year', 'registration_no'], where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, attributes: ['rate_type', 'amount'], where: { activity_share_type: '2' }, required: false},
            ] 
        }).then(data => {
        if (data.length) {
            var newData = [];
            for (const [index, val] of data.entries()) {
                let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                newData.push({
                    id: val.id,
                    title: val.title,
                    level: val.level,
                    quantity: val.quantity,
                    is_approved: val.is_approved,
                    status: val.status,
                    activity: {
                        title: val.activity.title
                    },
                    brand: {
                        name: val.brand.name
                    },
                    model: {
                        name: val.model.name,
                        type: val.model.type
                    },
                    vehicle_details: val.activity_vehicle_details.map(v => {
                        return {
                            year: v.year,
                            registration_no: v.registration_no
                        }
                    }),
                    price: {
                        per_hour: {
                            amount: perHourData.amount
                        }, 
                        per_day: {
                            amount: perDayData.amount
                        }
                    }
                })
            };
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Rental activities fetch successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
                error: null
            });
        }
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
 * @purpose:     To store (Rental) activity
*/
controller.rentalActivityStore  = async (req, res) => {
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
        let registrationNo =  await ActivityVehicleDetails.findAll().then(data => data.map(v => v.registration_no));
        if(req.body?.vehicle_details.some(v => registrationNo.includes(v.registration_no))){
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Registration number already exists.',
                error: true,
            });
        } 
        req.body.user_id = req.decoded_data.id;
        const rentalActivities = await RentalActivities.create(req.body);
        if(rentalActivities){
            var activityVehicleDetailsData = [];
            if (req.body?.vehicle_details?.length) {
                for await (const [i, v] of req.body.vehicle_details.entries()) {
                    let vehicleDetailData = {
                        activity_share_fk: rentalActivities.id,
                        activity_share_type: '2',
                        year: v.year,
                        registration_no: v.registration_no,
                    }
                    activityVehicleDetailsData.push(vehicleDetailData);
                };
            }
            await ActivityVehicleDetails.bulkCreate(activityVehicleDetailsData);

            var activityMediaData = [];
            if (req.files?.images?.length) {
                for await (const [i, file] of req.files.images.entries()) {
                    let picData = {
                        activity_share_fk: rentalActivities.id,
                        activity_share_type: '2',
                        media_type: '1',
                        media_path: file.filename,
                    }
                    activityMediaData.push(picData);
                }
            }
            if (req.files?.video?.length) {
                activityMediaData.push({
                    activity_share_fk: rentalActivities.id,
                    activity_share_type: '2',
                    media_type: '2',
                    media_path: req.files.video[0].filename,
                });
            }
            await ActivityMedia.bulkCreate(activityMediaData);

            if (Object.keys(req.body?.price).length) {
                var activityPriceData = [];
                activityPriceData.push({
                    activity_share_fk: rentalActivities.id,
                    activity_share_type: '2',
                    rate_type: '1',
                    vendor_amount: req.body.price.per_hour,
                });
                activityPriceData.push({
                    activity_share_fk: rentalActivities.id,
                    activity_share_type: '2',
                    rate_type: '2',
                    vendor_amount: req.body.price.per_day,
                });
                await ActivityPrices.bulkCreate(activityPriceData);
            }

            if (req.body?.what_to_take?.length != undefined || req.body?.thing_service_included?.length != undefined) {
                var activityRequireAccessoriesData = [];
                if (req.body?.what_to_take?.length != undefined) {
                    for await (const [i, v] of req.body.what_to_take.entries()) {
                        let data = {
                            activity_share_fk: rentalActivities.id,
                            activity_share_type: '2',
                            accessories_medium: '1',
                            name: v,
                        }
                        activityRequireAccessoriesData.push(data);
                    };
                }
                if (req.body?.thing_service_included?.length != undefined) {
                    for await (const [i, v] of req.body.thing_service_included.entries()) {
                        let data = {
                            activity_share_fk: rentalActivities.id,
                            activity_share_type: '2',
                            accessories_medium: '2',
                            name: v,
                        }
                        activityRequireAccessoriesData.push(data);
                    }
                }
                await ActivityRequireAccessories.bulkCreate(activityRequireAccessoriesData);
            }

            if (req.body?.add_ons?.length != undefined) {
                var activityAddOnsData = [];
                for await (const [i, v] of req.body.add_ons.entries()) {
                    let data = {
                        activity_share_fk: rentalActivities.id,
                        activity_share_type: '2',
                        item_name: v.item,
                        item_price: v.price,
                        quantity: v.quantity
                    }
                    activityAddOnsData.push(data);
                }
                await ActivityAddOns.bulkCreate(activityAddOnsData);
            }
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Rental activity added successfully.',
                error: null
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
 * @params:      rental_activity_id
 * @purpose:     To get (Rental) activity Detail
*/
controller.rentalActivityDetail  = async (req, res) => {
    await RentalActivities.findOne({attributes: ['id', 'title', 'level', 'quantity', 'description', 'warning', 'is_approved', 'status'], where: {id: req.params.id, user_id: req.decoded_data.id}, include:[
            {model: Bookings, 
                attributes: ['id'],
                include: [
                    {model: RatingReviews,
                        attributes: ['booking_id', 'rating'],
                        where: { 'booking_id' : {$not: null} },
                        required: true
                    }
                ],
                where: { activity_share_type: '2' }, required: false
            },
            {model: Activities, attributes: ['id', 'title', 'status']},
            {model: Brands, attributes: ['id', 'name', 'status']},
            {model: Models, attributes: ['id', 'name', 'type', 'status']},
            {model: ActivityVehicleDetails, attributes: ['id', 'year', 'registration_no', 'status'], where: { activity_share_type: '2' }, required: false},
            {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
            {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            {model: ActivityRequireAccessories, where: { activity_share_type: '2' }, required: false}, 
            {model: ActivityAddOns, attributes: ['id', 'item_name', 'item_price', 'quantity', 'status'], where: { activity_share_type: '2' }, required: false}
        ] }).then(val => {
        if (val) {
            var rating = 0;
            val.bookings.map(v => {
                rating += parseInt(v.rating_review.rating)
            })
            let videoData = val.activity_media.find(v => v.media_type == '2');
            let perHourData = val.activity_prices.find(v => v.rate_type == '1');
            let perDayData = val.activity_prices.find(v => v.rate_type == '2');
            var newData = {
                id: val.id,
                title: val.title,
                level: val.level,
                quantity: val.quantity,
                description: val.description,
                warning: val.warning,
                is_approved: val.is_approved,
                status: val.status,
                activity: {
                    id: val.activity.id,
                    title: val.activity.title,
                    status: val.activity.status,
                },
                brand: {
                    id: val.brand.id,
                    name: val.brand.name,
                    status: val.brand.status,
                },
                model: {
                    id: val.model.id,
                    name: val.model.name,
                    type: val.model.type,
                    status: val.model.status,
                },
                vehicle_details: val.activity_vehicle_details?.map(v => {
                    return {
                        id: v.id,
                        year: v.year,
                        registration_no: v.registration_no,
                        status: v.status
                    }
                }),
                images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
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
                price: {
                    per_hour: {
                        id: perHourData.id,
                        amount: perHourData.amount,
                        status: perHourData.status
                    }, 
                    per_day: {
                        id: perDayData.id,
                        amount: perDayData.amount,
                        status: perDayData.status
                    }
                },
                what_to_take: val.activity_require_accessories?.filter(v => v.accessories_medium == '1').map(v => {
                    return {
                        id: v.id,
                        name: v.name,
                        status: v.status
                    }
                }),
                thing_service_included: val.activity_require_accessories?.filter(v => v.accessories_medium == '2').map(v => {
                    return {
                        id: v.id,
                        name: v.name,
                        status: v.status
                    }
                }),
                add_ons: val.activity_add_ons.map(v => {
                    return {
                        id: v.id,
                        item: v.item_name,
                        price: v.item_price,
                        quantity: v.quantity,
                        status: v.status
                    }
                }),
                rating: rating / (5 * val.bookings.length) * 5,
                reviews: val.bookings.length
            };
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Rental activity fetch successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
                error: null
            });
        }
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
 * @purpose:     To update (Rental) activity
*/
controller.rentalActivityUpdate  = async (req, res) => {
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

        let oldData = await RentalActivities.findOne({where: {id: req.params.id, user_id: req.decoded_data.id}, include:[
            {model: ActivityVehicleDetails, where: { activity_share_type: '2' }, required: false},
            {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
            {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            {model: ActivityRequireAccessories, where: { activity_share_type: '2' }, required: false}, 
            {model: ActivityAddOns, where: { activity_share_type: '2' }, required: false}
        ] });
        const rentalActivitiesHistories = await RentalActivityHistories.create({
            user_id: oldData.user_id,
            activity_id: oldData.activity_id,
            rental_activity_id: oldData.id,
            brand_id: oldData.brand_id,
            model_id: oldData.model_id,
            title: oldData.title,
            level: oldData.level,
            quantity: oldData.quantity,
            description: oldData.description,
            warning: oldData.warning,
            is_approved: oldData.is_approved,
            status: oldData.status
        });
        if(rentalActivitiesHistories){
            if (oldData.activity_vehicle_details?.length != undefined) {
                var vehicleDetailsHistoriesData = [];
                for await (const [i, v] of oldData.activity_vehicle_details.entries()) {
                    let vehicleDetailData = {
                        activity_share_history_fk: rentalActivitiesHistories.id,
                        activity_vehicle_detail_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        year: v.year,
                        registration_no: v.registration_no,
                        status: v.status
                    }
                    vehicleDetailsHistoriesData.push(vehicleDetailData);
                };
                await ActivityVehicleDetailHistories.bulkCreate(vehicleDetailsHistoriesData);
            }

            if (oldData.activity_media?.length != undefined) {
                var activityMediaHistoriesData = [];
                for await (const [i, v] of oldData.activity_media.entries()) {
                    let mediaData = {
                        activity_share_history_fk: rentalActivitiesHistories.id,
                        activity_media_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        media_type: v.media_type,
                        media_path: v.media_path,
                        status: v.status
                    }
                    activityMediaHistoriesData.push(mediaData);
                }
                await ActivityMediaHistories.bulkCreate(activityMediaHistoriesData);
            }

            if (oldData.activity_prices?.length != undefined) {
                var activityPriceHistoriesData = [];
                for await (const [i, v] of oldData.activity_prices.entries()) {
                    let priceData = {
                        activity_share_history_fk: rentalActivitiesHistories.id,
                        activity_price_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        rate_type: v.rate_type,
                        no_of_person: v.no_of_person,
                        vendor_amount: v.vendor_amount,
                        admin_amount: v.admin_amount,
                        amount: v.amount,
                        status: v.status
                    }
                    activityPriceHistoriesData.push(priceData);
                }
                await ActivityPriceHistories.bulkCreate(activityPriceHistoriesData);
            }

            if (oldData.activity_require_accessories?.length != undefined) {
                var activityRequireAccessoriesHistoriesData = [];
                for await (const [i, v] of oldData.activity_require_accessories.entries()) {
                    let requireAccessoriesData = {
                        activity_share_history_fk: rentalActivitiesHistories.id,
                        activity_require_accessory_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        accessories_medium: v.accessories_medium,
                        name: v.name,
                        status: v.status
                    }
                    activityRequireAccessoriesHistoriesData.push(requireAccessoriesData);
                }
                await ActivityRequireAccessoryHistories.bulkCreate(activityRequireAccessoriesHistoriesData);
            }

            if (oldData.activity_add_ons?.length != undefined) {
                var activityAddOnHistoriesData = [];
                for await (const [i, v] of oldData.activity_add_ons.entries()) {
                    let addOnsData = {
                        activity_share_history_fk: rentalActivitiesHistories.id,
                        activity_add_on_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        item_name: v.item_name,
                        item_price: v.item_price,
                        quantity: v.quantity,
                        status: v.status
                    }
                    activityAddOnHistoriesData.push(addOnsData);
                }
                await ActivityAddOnHistories.bulkCreate(activityAddOnHistoriesData);
            }

            await Bookings.update({activity_history_share_fk: rentalActivitiesHistories.id}, { where: {activity_share_type: '2', activity_share_fk: req.params.id, activity_history_share_fk: null} });

        }

        const rentalActivities = await RentalActivities.update(req.body, {where: {id: req.params.id,  user_id: req.decoded_data.id}});
        if(rentalActivities){
            if (req.body?.vehicle_details.length) {
                let vehicleDetailsIds =  await ActivityVehicleDetails.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '2', 
                        id: {$in: req.body.vehicle_details.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityVehicleDetails.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '2', id: {$notIn: vehicleDetailsIds}}});
                for await (const [i, v] of req.body.vehicle_details.entries()) {
                    if(v.id) {
                        await ActivityVehicleDetails.update(v, {where: {id: v.id}});
                    } else{
                            v['activity_share_fk'] = req.params.id,
                            v['activity_share_type'] = '2',
                        await ActivityVehicleDetails.create(v);
                    }
                }
            }
            var activityMediaData = [];
            if (req.files?.images?.length) {
                for await (const [i, file] of req.files.images.entries()) {
                    let picData = {
                        activity_share_fk: req.params.id,
                        activity_share_type: '2',
                        media_type: '1',
                        media_path: file.filename,
                    }
                    activityMediaData.push(picData);
                }
            }
            if (req.files?.video?.length) {
                activityMediaData.push({
                    activity_share_fk: req.params.id,
                    activity_share_type: '2',
                    media_type: '2',
                    media_path: req.files.video[0].filename,
                });
            }
            if(activityMediaData.length) {
                await ActivityMedia.bulkCreate(activityMediaData);
            }
            if (Object.keys(req.body?.price).length) {
                var activityPriceData = [];
                activityPriceData.push({
                    id: req.body.price.per_hour.id,
                    activity_share_fk: req.params.id,
                    activity_share_type: '2',
                    rate_type: '1',
                    vendor_amount: req.body.price.per_hour.amount,
                });
                activityPriceData.push({
                    id: req.body.price.per_day.id,
                    activity_share_fk: req.params.id,
                    activity_share_type: '2',
                    rate_type: '2',
                    vendor_amount: req.body.price.per_day.amount,
                });
                for await (const [index, val] of activityPriceData.entries()) {
                    await ActivityPrices.update(val, {where: {id: val.id}});
                }
            }
            var activityRequireAccessoriesData = [];
            if (req.body?.what_to_take?.length != undefined) {
                let whatToTakeIds =  await ActivityRequireAccessories.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '2',
                        id: {$in: req.body.what_to_take.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityRequireAccessories.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '2', accessories_medium: '1', id: {$notIn: whatToTakeIds}}});
                for await (const [i, v] of req.body.what_to_take.entries()) {
                    let data = {
                        id: v.id,
                        activity_share_fk: req.params.id,
                        activity_share_type: '2',
                        accessories_medium: '1',
                        name: v.name,
                    }
                    activityRequireAccessoriesData.push(data);
                }
            }
            if (req.body?.thing_service_included?.length != undefined) {
                let thingServiceIncludedIds =  await ActivityRequireAccessories.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '2',
                        id: {$in: req.body.thing_service_included.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityRequireAccessories.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '2', accessories_medium: '2', id: {$notIn: thingServiceIncludedIds}}});
                for await (const [i, v] of req.body.thing_service_included.entries()) {
                    let data = {
                        id: v.id,
                        activity_share_fk: req.params.id,
                        activity_share_type: '2',
                        accessories_medium: '2',
                        name: v.name,
                    }
                    activityRequireAccessoriesData.push(data);
                }
            }
            if(activityRequireAccessoriesData.length) {
                
                for await (const [index, val] of activityRequireAccessoriesData.entries()) {
                    if(val.id) {
                        await ActivityRequireAccessories.update(val, { where: { id: val.id}});
                    } else{
                        await ActivityRequireAccessories.create(val);
                    }
                }
            }
            if (req.body?.add_ons?.length != undefined) {
                let addOnsIds =  await ActivityAddOns.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '2',
                        id: {$in: req.body.add_ons.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityAddOns.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '2', id: {$notIn: addOnsIds}}});
                for await (const [i, v] of req.body.add_ons.entries()) {
                    if(v.id) {
                        let data = {
                            item_name: v.item,
                            item_price: v.price,
                            quantity: v.quantity
                        }
                        await ActivityAddOns.update(data, { where: { id: v.id}});
                    } else{
                        let data = {
                            activity_share_fk: req.params.id,
                            activity_share_type: '2',
                            item_name: v.item,
                            item_price: v.price,
                            quantity: v.quantity
                        }
                        await ActivityAddOns.create(data);
                    }
                }
            }
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Rental activity updated successfully.',
                error: null
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
 * @params:      activity_media_id
 * @purpose:     To (Adventure/Rental) Activity update status
*/
controller.activityUpdateStatus = async (req, res) => {
    await RentalActivities.update({status: req.body.status}, {where: {id: req.params.id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Activity status updated successfully.',
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
 * @params:      activity_media_id
 * @purpose:     To delete (Adventure/Rental) activity (media file) image or video
*/
controller.activityMediaFileDelete  = async (req, res) => {
    await ActivityMedia.destroy({where: {id: req.params.id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Activity media file deleted successfully.',
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
 * @params:      
 * @purpose:     To get (Adventure) activities
*/
controller.adventureActivities  = async (req, res) => {
    await AdventureActivities.findAll({
        attributes: ['id', 'title', 'level', 'is_approved', 'status'],
        where: {user_id: req.decoded_data.id}, 
        include:[
            {model: Activities, attributes: ['title'], include: [{model: ActivityAdventureTypes, attributes: ['name']}]},
            {model: ActivityPrices, attributes: ['rate_type', 'no_of_person', 'amount'], where: { activity_share_type: '1' }, required: false}, 
        ] 
    }).then(data => {
        if (data.length) {
            var newData = [];
            for (const [i, val] of data.entries()) {
                newData.push({
                    id: val.id,
                    title: val.title,
                    level: val.level,
                    is_approved: val.is_approved,
                    status: val.status,
                    activity: {
                        title: val.activity.title,
                        activity_adventure_type: {
                            name: val.activity.activity_adventure_type.name,
                        }
                    },
                    price: val?.activity_prices?.filter(v => v.rate_type == '3').map(v => {
                        return {
                            no_of_person: v.no_of_person,
                            amount: v.amount,
                        }
                    }),
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Adventure activities fetch successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
                error: null
            });
        }
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
 * @purpose:     To store (Adventure) activity
*/
controller.adventureActivityStore  = async (req, res) => {
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
        req.body.activity_type = req.body.activity_type_data.activity_type;
        if(req.body.activity_type_data.activity_type == '1'){
            req.body.single_day_categories = req.body.activity_type_data.single_day_categories;
        }
        req.body.language = String(req.body.language);
        const adventureActivities = await AdventureActivities.create(req.body);
        if(adventureActivities){
            if (req.body?.price?.length) {
                var activityPriceData = [];
                for await (const [i, v] of req.body.price.entries()) {
                    let priceData = {
                        activity_share_fk: adventureActivities.id,
                        activity_share_type: '1',
                        rate_type: '3',
                        no_of_person: v.no_of_person,
                        vendor_amount: v.amount,
                    }
                    activityPriceData.push(priceData);
                }
                await ActivityPrices.bulkCreate(activityPriceData);
            }
            if(req.body.is_pickup == '1'){
                let activityMeetingPointData = {
                    adventure_activity_id: adventureActivities.id,
                    is_extra_charges: req.body.is_extra_charges,
                    address_line_one: req.body.address_line_one,
                    address_line_two: req.body.address_line_two,
                    landmark: req.body.landmark,
                    country: req.body.country,
                    state: req.body.state,
                    city: req.body.city,
                    pin_code: req.body.pin_code,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    location: req.body.location,
                }
                await ActivityMeetingPoints.create(activityMeetingPointData);
            }
            var activityMediaData = [];
            if (req.files?.images?.length) {
                for await (const [i, file] of req.files.images.entries()) {
                    let picData = {
                        activity_share_fk: adventureActivities.id,
                        activity_share_type: '1',
                        media_type: '1',
                        media_path: file.filename,
                    }
                    activityMediaData.push(picData);
                }
            }
            if (req.files?.video?.length) {
                activityMediaData.push({
                    activity_share_fk: adventureActivities.id,
                    activity_share_type: '1',
                    media_type: '2',
                    media_path: req.files.video[0].filename,
                });
            }
            await ActivityMedia.bulkCreate(activityMediaData);
            if (req.body?.what_to_take?.length != undefined || req.body?.thing_service_included?.length != undefined) {
                var activityRequireAccessoriesData = [];
                if (req.body?.what_to_take?.length != undefined) {
                    for await (const [i, v] of req.body.what_to_take.entries()) {
                        let data = {
                            activity_share_fk: adventureActivities.id,
                            activity_share_type: '1',
                            accessories_medium: '1',
                            name: v.name,
                        }
                        activityRequireAccessoriesData.push(data);
                    }
                }
                if (req.body?.thing_service_included?.length != undefined) {
                    for await (const [i, v] of req.body.thing_service_included.entries()) {
                        let data = {
                            activity_share_fk: adventureActivities.id,
                            activity_share_type: '1',
                            accessories_medium: '2',
                            name: v.name,
                        }
                        activityRequireAccessoriesData.push(data);
                    }
                }
                await ActivityRequireAccessories.bulkCreate(activityRequireAccessoriesData);
            }
            if (req.body?.add_ons?.length != undefined) {
                var activityAddOnsData = [];
                for await (const [i, v] of req.body.add_ons.entries()) {
                    let data = {
                        activity_share_fk: adventureActivities.id,
                        activity_share_type: '1',
                        item_name: v.item,
                        item_price: v.price,
                        quantity: v.quantity
                    }
                    activityAddOnsData.push(data);
                }
                await ActivityAddOns.bulkCreate(activityAddOnsData);
            }
            if(req.body.activity_type_data.activity_type == '1'){
                if(req.body.activity_type_data.single_day_categories != '3'){
                    if(req.body.activity_type_data.single_day_categories == '1'){
                        let activityTimeSheetsData = {
                            adventure_activity_id: adventureActivities.id,
                            slot_type: req.body.activity_type_data.slot_type
                        };
                        var timeSheetObj = await ActivityTimeSheets.create(activityTimeSheetsData);
                        if(req.body.activity_type_data.slot_type == '1'){
                            let activityAutoTimeSheetData = {
                                activity_time_sheet_id: timeSheetObj.id,
                                start_time: req.body.activity_type_data.auto.start_time,
                                slot_time_duration: req.body.activity_type_data.auto.slot_time_duration,
                                day_slot: req.body.activity_type_data.auto.day_slot,
                                time_slot: req.body.activity_type_data.auto.time_slot
                            };
                            await ActivityAutoTimeSheets.create(activityAutoTimeSheetData);
                        }
                        var activityTimeSheetTimeData = [];
                        for await (const [i, v] of req.body.activity_type_data.slot.entries()) {
                            let data = {
                                activity_time_sheet_id: timeSheetObj.id,
                                start_time: v.start_time,
                                end_time: v.end_time,
                                quantity: v.quantity
                            }
                            activityTimeSheetTimeData.push(data);
                        }
                        await ActivityTimeSheetTimes.bulkCreate(activityTimeSheetTimeData);
                    } else{                        
                        for await (const [i, v] of req.body.activity_type_data.flexd.entries()) {
                            let data = {
                                adventure_activity_id: adventureActivities.id,
                                slot_type: v.slot_type
                            };
                            let timeSheetObj = await ActivityTimeSheets.create(data);
                            let data1 = {
                                activity_time_sheet_id: timeSheetObj.id,
                                duration: v.duration,
                                start_time: v.start_time,
                                day_quantity: v.day_quantity,
                                duration_quantity: v.duration_quantity,
                                itinerary: v.itinerary
                            }
                            await ActivityFlexdTimeSheets.create(data1);
                            let slotVal = req.body.activity_type_data.slot.find((val, key) => key == i);
                            let data2 = {
                                activity_time_sheet_id: timeSheetObj.id,
                                start_time: slotVal.start_time,
                                end_time: slotVal.end_time,
                                quantity: slotVal.quantity
                            }
                            await ActivityTimeSheetTimes.create(data2);
                        };
                    }
                }
            } else if(req.body.activity_type_data.activity_type == '2'){
                let activityDaySheetData = {
                    adventure_activity_id: adventureActivities.id,
                    duration: req.body.activity_type_data.duration,
                    start_date: req.body.activity_type_data.start_date,
                    no_of_spot: req.body.activity_type_data.no_of_spot,
                    quantity: req.body.activity_type_data.quantity,
                    start_time: req.body.activity_type_data.start_time,
                    end_time: req.body.activity_type_data.end_time
                };
                var daySheetObj = await ActivityDaySheets.create(activityDaySheetData);
                var activityDaySheetDaysData = [];
                for await (const [i, v] of req.body.activity_type_data.itinerary.entries()) {
                    let data = {
                        activity_day_sheet_id: daySheetObj.id,
                        day: i+1,
                        itinerary: v
                    }
                    activityDaySheetDaysData.push(data);
                }
                var daySheetDayData = await ActivityDaySheetDays.bulkCreate(activityDaySheetDaysData);
                if(req.body.activity_type_data.activity_repeat_in_future == '1'){
                    for await (const [index, val] of req.body.activity_type_data.repeat_in_fature.entries()) {
                        let activityDaySheetDataRepeat = {
                            adventure_activity_id: adventureActivities.id,
                            duration: daySheetObj.duration,
                            start_date: val.repeat_start_date,
                            no_of_spot: val.spot,
                            quantity: val.quantity,
                            start_time: daySheetObj.start_time,
                            end_time: daySheetObj.end_time
                        };
                        var daySheetRepeatObj = await ActivityDaySheets.create(activityDaySheetDataRepeat);
                        var activityDaySheetDaysDataRepeat = [];
                        for await (const [i, v] of daySheetDayData.entries()) {
                            let data = {
                                activity_day_sheet_id: daySheetRepeatObj.id,
                                day: v.day,
                                itinerary: v.itinerary,
                                copy_day_sheet_day_id: v.id
                            };
                            activityDaySheetDaysDataRepeat.push(data);
                        }
                    }
                    await ActivityDaySheetDays.bulkCreate(activityDaySheetDaysDataRepeat);
                }
            }
            if (req.body?.list_date.length) {
                var activityListDateData = [];
                for await (const [i, v] of req.body.list_date.entries()) {
                    let data = {
                        adventure_activity_id: adventureActivities.id,
                        start_date: v.start_date,
                        end_date: v.end_date
                    }
                    activityListDateData.push(data);
                }
                await ActivityAdventureListDates.bulkCreate(activityListDateData);
            }
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Adventure activity added successfully.',
                error: null
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
 * @params:      Request, Id
 * @purpose:     To update (Adventure) activity
*/
controller.adventureActivityUpdate  = async (req, res) => {
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

        let oldData = await AdventureActivities.findOne({where: {id: req.params.id, user_id: req.decoded_data.id}, include:[
            {model: Activities},
            {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
            {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
            {model: ActivityRequireAccessories, where: { activity_share_type: '1' }, required: false}, 
            {model: ActivityAddOns, where: { activity_share_type: '1' }, required: false},
            {model: ActivityMeetingPoints},
            {model: ActivityTimeSheets, include: [{model: ActivityAutoTimeSheets}, {model: ActivityFlexdTimeSheets}, {model: ActivityTimeSheetTimes}]},
            {model: ActivityDaySheets, include: [{model: ActivityDaySheetDays}]},
            {model: ActivityAdventureListDates},
        ] });
        const adventureActivitiesHistories = await AdventureActivityHistories.create({
            user_id: oldData.user_id,
            activity_id: oldData.activity_id,
            adventure_activity_id: oldData.id,
            activity_adventure_type_id: oldData.activity_adventure_type_id,
            title: oldData.title,
            level: oldData.level,
            altitude_depth_height: oldData.altitude_depth_height,
            age_from: oldData.age_from,
            age_to: oldData.age_to,
            language: oldData.language,
            description: oldData.description,
            warning: oldData.warning,
            is_pickup: oldData.is_pickup,
            activity_type: oldData.activity_type,
            single_day_categories: oldData.single_day_categories,
            is_provide_all_parts: oldData.is_provide_all_parts,
            is_website: oldData.is_website,
            website_link: oldData.website_link,
            discount: oldData.discount,
            is_approved: oldData.is_approved,
            status: oldData.status
        });
        if(adventureActivitiesHistories){
            if (oldData.activity_media?.length) {
                var activityMediaHistoriesData = [];
                for await (const [i, v] of oldData.activity_media.entries()) {
                    let mediaData = {
                        activity_share_history_fk: adventureActivitiesHistories.id,
                        activity_media_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        media_type: v.media_type,
                        media_path: v.media_path,
                        status: v.status
                    }
                    activityMediaHistoriesData.push(mediaData);
                }
                await ActivityMediaHistories.bulkCreate(activityMediaHistoriesData);
            }
            if (oldData.activity_prices?.length) {
                var activityPriceHistoriesData = [];
                for await (const [i, v] of oldData.activity_prices.entries()) {
                    let priceData = {
                        activity_share_history_fk: adventureActivitiesHistories.id,
                        activity_price_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        rate_type: v.rate_type,
                        no_of_person: v.no_of_person,
                        vendor_amount: v.vendor_amount,
                        admin_amount: v.admin_amount,
                        amount: v.amount,
                        status: v.status
                    }
                    activityPriceHistoriesData.push(priceData);
                }
                await ActivityPriceHistories.bulkCreate(activityPriceHistoriesData);
            }
            if (oldData.activity_require_accessories?.length) {
                var activityRequireAccessoriesHistoriesData = [];
                for await (const [i, v] of oldData.activity_require_accessories.entries()) {
                    let requireAccessoriesData = {
                        activity_share_history_fk: adventureActivitiesHistories.id,
                        activity_require_accessory_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        accessories_medium: v.accessories_medium,
                        name: v.name,
                        status: v.status
                    }
                    activityRequireAccessoriesHistoriesData.push(requireAccessoriesData);
                }
                await ActivityRequireAccessoryHistories.bulkCreate(activityRequireAccessoriesHistoriesData);
            }
            if (oldData.activity_add_ons?.length) {
                var activityAddOnHistoriesData = [];
                for await (const [i, v] of oldData.activity_add_ons.entries()) {
                    let addOnsData = {
                        activity_share_history_fk: adventureActivitiesHistories.id,
                        activity_add_on_id: v.id,
                        activity_share_fk: v.activity_share_fk,
                        activity_share_type: v.activity_share_type,
                        item_name: v.item_name,
                        item_price: v.item_price,
                        quantity: v.quantity,
                        status: v.status
                    }
                    activityAddOnHistoriesData.push(addOnsData);
                }
                await ActivityAddOnHistories.bulkCreate(activityAddOnHistoriesData);
            }
            if (oldData.activity_meeting_point?.length) {
                let activityMeetingPointHistoriesData = {
                    adventure_activity_history_id: adventureActivitiesHistories.id,
                    activity_meeting_point_id: oldData.activity_meeting_point.id,
                    adventure_activity_id: oldData.activity_meeting_point.adventure_activity_id,
                    is_extra_charges: oldData.activity_meeting_point.is_extra_charges,
                    address_line_one: oldData.activity_meeting_point.address_line_one,
                    address_line_two: oldData.activity_meeting_point.address_line_two,
                    landmark: oldData.activity_meeting_point.landmark,
                    country: oldData.activity_meeting_point.country,
                    state: oldData.activity_meeting_point.state,
                    city: oldData.activity_meeting_point.city,
                    pin_code: oldData.activity_meeting_point.pin_code,
                    latitude: oldData.activity_meeting_point.latitude,
                    longitude: oldData.activity_meeting_point.longitude,
                    location: oldData.activity_meeting_point.location,
                }
                await ActivityMeetingPointHistories.create(activityMeetingPointHistoriesData);
            }
            if(oldData.activity_type == '1'){
                if (oldData.activity_time_sheets?.length) {
                    if(oldData.single_day_categories != '3'){
                        if(oldData.single_day_categories == '1'){
                            let activityTimeSheetHistoriesData = {
                                adventure_activity_history_id: adventureActivitiesHistories.id,
                                activity_time_sheet_id: oldData.activity_time_sheets[0].id,
                                adventure_activity_id: oldData.activity_time_sheets[0].adventure_activity_id,
                                slot_type: oldData.activity_time_sheets[0].slot_type
                            }
                            const activityTimeSheetHistories = await ActivityTimeSheetHistories.create(activityTimeSheetHistoriesData);
                            if(oldData.activity_time_sheets[0].slot_type == '1'){
                                let activityAutoTimeSheetHistoriesData = {
                                    activity_time_sheet_history_id: activityTimeSheetHistories.id,
                                    activity_auto_time_sheet_id: oldData.activity_time_sheets[0]?.activity_auto_time_sheet.id,
                                    activity_time_sheet_id: oldData.activity_time_sheets[0]?.id,
                                    start_time: oldData.activity_time_sheets[0]?.activity_auto_time_sheet.start_time,
                                    slot_time_duration: oldData.activity_time_sheets[0]?.activity_auto_time_sheet.slot_time_duration,
                                    day_slot: oldData.activity_time_sheets[0]?.activity_auto_time_sheet.day_slot,
                                    time_slot: oldData.activity_time_sheets[0]?.activity_auto_time_sheet.time_slot
                                }
                                await ActivityAutoTimeSheetHistories.create(activityAutoTimeSheetHistoriesData);
                            }
                            var activityTimeSheetTimeHistoriesData = [];
                            for await (const [i, v] of oldData.activity_time_sheets[0]?.activity_time_sheet_times.entries()) {
                                let timeSheetHistoriesData = {
                                    activity_time_sheet_history_id: activityTimeSheetHistories.id,
                                    activity_time_sheet_id: v.id,
                                    start_time: v.start_time,
                                    end_time: v.end_time,
                                    quantity: v.quantity,
                                    status: v.status
                                }
                                activityTimeSheetTimeHistoriesData.push(timeSheetHistoriesData);
                            }
                            await ActivityTimeSheetTimeHistories.bulkCreate(activityTimeSheetTimeHistoriesData);
                        } else{
                            for await (const [i, v] of oldData.activity_time_sheets.entries()) {
                                let activityTimeSheetHistoriesData = {
                                    adventure_activity_history_id: adventureActivitiesHistories.id,
                                    activity_time_sheet_id: v.id,
                                    adventure_activity_id: v.adventure_activity_id,
                                    slot_type: v.slot_type
                                }
                                let activityTimeSheetHistories = await ActivityTimeSheetHistories.create(activityTimeSheetHistoriesData);
                                let flexdTimeSheetsHistoriesData = {
                                    activity_time_sheet_history_id: activityTimeSheetHistories.id,
                                    activity_flexd_time_sheet_id: v.activity_flexd_time_sheet?.id,
                                    activity_time_sheet_id: v.activity_flexd_time_sheet?.activity_time_sheet_id,
                                    duration: v.activity_flexd_time_sheet?.duration,
                                    start_time: v.activity_flexd_time_sheet?.start_time,
                                    day_quantity: v.activity_flexd_time_sheet?.day_quantity,
                                    duration_quantity: v.activity_flexd_time_sheet?.duration_quantity,
                                    itinerary: v.activity_flexd_time_sheet?.itinerary
                                }
                                await ActivityFlexdTimeSheetHistories.create(flexdTimeSheetsHistoriesData);
                            }
                        }
                    }
                }
            } else if(oldData.activity_type == '2'){
                if (oldData.activity_day_sheets?.length) {
                    for await (const [i, v] of oldData.activity_day_sheets.entries()) {
                        let activityDaySheetHistoriesData = {
                            adventure_activity_history_id: adventureActivitiesHistories.id,
                            activity_day_sheet_id: v.id,
                            adventure_activity_id: v.adventure_activity_id,
                            duration: v.duration,
                            start_date: v.start_date,
                            no_of_spot: v.no_of_spot,
                            quantity: v.quantity,
                            start_time: v.start_time,
                            end_time: v.end_time,
                            status: v.status
                        };
                        var activityDaySheetHistories = await ActivityDaySheetHistories.create(activityDaySheetHistoriesData);
                        var activityDaySheetDayHistoriesData = [];
                        for await (const [index, value] of v.activity_day_sheet_days.entries()) {
                            let daySheetDayHistoriesData = {
                                activity_day_sheet_history_id: activityDaySheetHistories.id,
                                activity_day_sheet_day_id: v.id,
                                activity_day_sheet_id: v.activity_day_sheet_id,
                                day: v.day,
                                itinerary: v.itinerary,
                                copy_day_sheet_day_id: v.copy_day_sheet_day_id,
                                status: v.status
                            }
                            activityDaySheetDayHistoriesData.push(daySheetDayHistoriesData);
                        }
                        await ActivityDaySheetDayHistories.bulkCreate(activityDaySheetDayHistoriesData);
                    }
                }
            }
            if (oldData.activity_adventure_list_dates?.length) {
                var activityAdventureListDatesHistoriesData = [];
                for await (const [i, v] of oldData.activity_adventure_list_dates.entries()) {
                    let adventureListDatesData = {
                        adventure_activity_history_id: adventureActivitiesHistories.id,
                        activity_adventure_list_date_id: v.id,
                        adventure_activity_id: v.adventure_activity_id,
                        start_date: v.start_date,
                        end_date: v.end_date,
                        status: v.status
                    }
                    activityAdventureListDatesHistoriesData.push(adventureListDatesData);
                }
                await ActivityAdventureListDateHistories.bulkCreate(activityAdventureListDatesHistoriesData);
            }
            await Bookings.update({activity_history_share_fk: adventureActivitiesHistories.id}, { where: {activity_share_type: '1', activity_share_fk: req.params.id, activity_history_share_fk: null} });
        }

        req.body.user_id = req.decoded_data.id;
        req.body.language = String(req.body.language);
        const result = await AdventureActivities.update(req.body, {where: {id: req.params.id,  user_id: req.decoded_data.id}});
        if(result){
            if (req.body?.price?.length) {
                let priceIds =  await ActivityPrices.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '1',
                        id: {$in: req.body.price.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityPrices.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '1', rate_type: '3', id: {$notIn: priceIds}}});
                for await (const [i, v] of req.body.price.entries()) {
                    let priceData = {
                        id: v.id,
                        activity_share_fk: req.params.id,
                        activity_share_type: '1',
                        rate_type: '3',
                        no_of_person: v.no_of_person,
                        vendor_amount: v.amount,
                    }
                    if(v.id) {
                        await ActivityPrices.update(priceData, {where: {id: v.id}});
                    } else{
                        await ActivityPrices.create(priceData);
                    }
                }
            }
            if(req.body?.is_pickup == '1'){
                let activityMeetingPointData = {
                    adventure_activity_id: req.params.id,
                    is_extra_charges: req.body.is_extra_charges,
                    address_line_one: req.body.address_line_one,
                    address_line_two: req.body.address_line_two,
                    landmark: req.body.landmark,
                    country: req.body.country,
                    state: req.body.state,
                    city: req.body.city,
                    pin_code: req.body.pin_code,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    location: req.body.location,
                }
                if(req.body?.meeting_point_id) {
                    await ActivityMeetingPoints.update(activityMeetingPointData, {where: {id: req.body?.meeting_point_id}});
                } else{
                    await ActivityMeetingPoints.create(activityMeetingPointData);
                }
            } else{
                await ActivityMeetingPoints.destroy({where: {adventure_activity_id: req.params.id}});
            }
            var activityMediaData = [];
            if (req.files?.images?.length) {
                for await (const [i, file] of req.files.images.entries()) {
                    let picData = {
                        activity_share_fk: req.params.id,
                        activity_share_type: '1',
                        media_type: '1',
                        media_path: file.filename,
                    }
                    activityMediaData.push(picData);
                }
            }
            if (req.files?.video?.length) {
                activityMediaData.push({
                    activity_share_fk: req.params.id,
                    activity_share_type: '1',
                    media_type: '2',
                    media_path: req.files.video[0].filename,
                });
            }
            if(activityMediaData.length) {
                await ActivityMedia.bulkCreate(activityMediaData);
            }
            var activityRequireAccessoriesData = [];
            if (req.body?.what_to_take?.length != undefined) {
                let whatToTakeIds =  await ActivityRequireAccessories.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '1',
                        id: {$in: req.body.what_to_take.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityRequireAccessories.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '1', accessories_medium: '1', id: {$notIn: whatToTakeIds}}});
                for await (const [i, v] of req.body.what_to_take.entries()) {
                    let data = {
                        id: v.id,
                        activity_share_fk: req.params.id,
                        activity_share_type: '1',
                        accessories_medium: '1',
                        name: v.name,
                    }
                    activityRequireAccessoriesData.push(data);
                }
            }
            if (req.body?.thing_service_included?.length != undefined) {
                let thingServiceIncludedIds =  await ActivityRequireAccessories.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '1',
                        id: {$in: req.body.thing_service_included.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityRequireAccessories.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '1', accessories_medium: '2', id: {$notIn: thingServiceIncludedIds}}});
                for await (const [i, v] of req.body.thing_service_included.entries()) {
                    let data = {
                        id: v.id,
                        activity_share_fk: req.params.id,
                        activity_share_type: '1',
                        accessories_medium: '2',
                        name: v.name,
                    }
                    activityRequireAccessoriesData.push(data);
                }
            }
            if(activityRequireAccessoriesData?.length) {
                for await (const [i, val] of activityRequireAccessoriesData.entries()) {
                    if(val.id) {
                        await ActivityRequireAccessories.update(val, {where: {id: val.id}});
                    } else{
                        await ActivityRequireAccessories.create(val);
                    }
                }
            }
            if (req.body?.add_ons?.length != undefined) {
                let addOnsIds =  await ActivityAddOns.findAll({
                    where: {
                        activity_share_fk: req.params.id, 
                        activity_share_type: '1',
                        id: {$in: req.body.thing_service_included.map(v => v.id)}
                    }}).then(val => val.map(v => v.id));
                await ActivityAddOns.destroy({where: {activity_share_fk: req.params.id, activity_share_type: '1', id: {$notIn: addOnsIds}}});
                for await (const [i, v] of req.body.add_ons.entries()) {
                    if(v.id) {
                        let data = {
                            item_name: v.item,
                            item_price: v.price,
                            quantity: v.quantity
                        }
                        await ActivityAddOns.update(data, {where: {id: v.id}});
                    } else{
                        let data = {
                            activity_share_fk: req.params.id,
                            activity_share_type: '1',
                            item_name: v.item,
                            item_price: v.price,
                            quantity: v.quantity
                        }
                        await ActivityAddOns.create(data);
                    }
                }
            }
            if (req.body?.list_date?.length) {
                let listDateIds =  await ActivityAdventureListDates.findAll({where: {adventure_activity_id: req.params.id}}).then(val => val.map(v => v.id));
                await ActivityAdventureListDates.destroy({where: {adventure_activity_id: req.params.id, id: {$notIn: listDateIds}}});
                for await (const [i, v] of req.body.list_date.entries()) {
                    if(v.id) {
                        await ActivityAdventureListDates.update(v, { where: {id: v.id}});
                    } else{
                        await ActivityAdventureListDates.create(v);
                    }
                }
            }
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Adventure activity updated successfully.',
                error: null
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
 * @params:      Id
 * @purpose:     To get (Adventure) activity Detail
*/
controller.adventureActivityDetail  = async (req, res) => {
    await AdventureActivities.findOne({where: {user_id: req.decoded_data.id, id: req.params.id}, include:[
        {model: Bookings, 
            attributes: ['id'],
            include: [
                {model: RatingReviews,
                    attributes: ['booking_id', 'rating'],
                    where: { 'booking_id' : {$not: null} },
                    required: true
                }
            ],
            where: { activity_share_type: '2' }, required: false
        },
        {model: Activities, attributes: ['id', 'title', 'status'], include: [{model: ActivityAdventureTypes, attributes: ['id', 'name', 'status']}]},
        {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
        {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
        {model: ActivityRequireAccessories, where: { activity_share_type: '1' }, required: false}, 
        {model: ActivityAddOns, attributes: ['id', 'item_name', 'item_price', 'quantity', 'status'], where: { activity_share_type: '1' }, required: false},
        {model: ActivityMeetingPoints},
        {model: ActivityTimeSheets, include: [{model: ActivityAutoTimeSheets}, {model: ActivityFlexdTimeSheets}, {model: ActivityTimeSheetTimes}]},
        {model: ActivityDaySheets, include: [{model: ActivityDaySheetDays}]},
        {model: ActivityAdventureListDates},
    ] }).then(val => {
        if (val) {
            let videoData = val.activity_media?.find(v => v.media_type == '2');
            var rating = 0;
            val.bookings.map(v => {
                rating += parseInt(v.rating_review.rating)
            })
            let newData = {
                id: val.id,
                activity_id: val.activity_id,
                activity_adventure_type_id: val.activity_adventure_type_id,
                title: val.title,
                level: val.level,
                altitude_depth_height: val.altitude_depth_height,
                age_from: val.age_from,
                age_to: val.age_to,
                language: val.language.toString().split(','),
                description: val.description,
                warning: val.warning,
                is_pickup: val.is_pickup,
                activity_type: val.activity_type,
                single_day_categories: val.single_day_categories,
                is_provide_all_parts: val.is_provide_all_parts,
                website_link: val.website_link,
                is_website: val.is_website,
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
                    activity_adventure_type: {
                        id: val.activity.activity_adventure_type.id,
                        name: val.activity.activity_adventure_type.name,
                        status: val.activity.activity_adventure_type.status
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
                rating: rating / (5 * val.bookings.length) * 5,
                reviews: val.bookings.length
            }
            if(val?.activity_time_sheets?.length) {
                if(val.single_day_categories == '2') {
                    newData.activity_type_data = {};
                    newData.activity_type_data.flexd = [];
                    newData.activity_type_data.slot = [];
                    for (const [i, value] of val.activity_time_sheets.entries()) {
                        var ATS = value;
                        newData.activity_type_data.flexd.push({
                            activity_time_sheet_id: ATS.id,
                            slot_type: ATS.slot_type,
                        });
                        newData.activity_type_data.slot.push(ATS.activity_time_sheet_times?.map(v => {
                            let mapVal = {
                                activity_time_sheet_times_id: v.id,
                                start_time: v.start_time,
                                end_time: v.end_time,
                                quantity: v.quantity,
                                status: v.status
                            };
                            if(ATS.activity_flexd_time_sheet) {
                                mapVal.itinerary = ATS.activity_flexd_time_sheet.itinerary
                            }
                            return mapVal;
                        }).find(x => true));
                    }
                } else{
                    let ATS = val.activity_time_sheets[0];
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
                }
            }
            if(val?.activity_day_sheets?.length) {
                newData.activity_type_data = [];
                for (const [i, ADS] of val.activity_day_sheets.entries()) {
                    newData.activity_type_data.push({
                        activity_day_sheet_id: ADS.id,
                        duration: ADS.duration,
                        start_date: ADS.start_date,
                        no_of_spot: ADS.no_of_spot,
                        quantity: ADS.quantity,
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
                    })
                }
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Adventure activities fetch successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
                error: null
            });
        }
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
 * @params:      Id
 * @purpose:     To (Adventure/Activity) activity update status
*/
controller.adventureActivityUpdateStatus = async (req, res) => {
    await AdventureActivities.update({status: req.body.status}, {where: {id: req.params.id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Adventure Activity status updated successfully.',
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
 * @params:      activity_media_id
 * @purpose:     To delete (Adventure/Activity) activity (media file) image or video
*/
controller.activityMediaFileDelete  = async (req, res) => {
    ActivityMedia.destroy({where: {id: req.params.id}}).then(data => {
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Activity media file deleted successfully.',
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
 * @params:      
 * @purpose:     To get all booking of users
*/
controller.getAllBookings  = async (req, res) => {
    try {
        if(req.decoded_data?.vendor_business_detail?.category_id == '1'){
            var adventureBookingActivities = await Bookings.findAll({
                where: { status: {$not: '3'}, activity_share_type: '1' }, 
                include:[
                    {model: AdventureActivities, 
                        where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : null, user_id: req.decoded_data.id }, required: false,
                        include:[
                            {model: Activities},
                            {model: ActivityAdventureTypes},
                        ],  
                    },
                    {model: AdventureActivityHistories, 
                        where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : {$not: null}, user_id: req.decoded_data.id }, required: false,
                        include: [
                            {model: Activities},
                            {model: ActivityAdventureTypes},
                        ]
                    },
                    {model: Users},
                ]
            });
            if (adventureBookingActivities.length) {
                var newData = [];
                for await (const [index, val] of adventureBookingActivities.entries()) {
                    let AA = val.adventure_activity_history || val.adventure_activity;
                    newData.push({
                        id: val.id,
                        activity_category: 'Adventure',
                        quantity: val.quantity,
                        price_type: val.price_type,
                        price: val.price,
                        total_price: val.total_price,
                        start_date: val.start_date,
                        end_date: val.end_date,
                        start_time: val.start_time,
                        end_time: val.end_time,
                        is_pickup: val.is_pickup,
                        status: val.status,
                        createdAt: val.createdAt,
                        adventure_activity: AA ? {
                            title: AA.title,
                            activity: {
                                title: AA.activity?.title,
                            },
                            activity_adventure_type: {
                                name: AA.activity_adventure_type?.name,
                            },
                        } : null,
                        user: val?.user ? {
                            first_name: val.user.first_name,
                            last_name: val.user.last_name,
                            email: val.user.email,
                            country_code: val.user.country_code,
                            mobile_no : val.user.mobile_no,
                        } : null,
                    });
                }
                newData = newData.sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
                return res.status(200).json({
                    status: 200,
                    data: newData,
                    message: 'Bookings fetch successfully.',
                    error: null
                });
            } else{
                return res.status(200).json({
                    status: 200,
                    data: [],
                    message: 'No data found.',
                    error: null
                });
            }
        } else if(req.decoded_data?.vendor_business_detail?.category_id == '2') {
            var rentalBookingActivities = await Bookings.findAll({
                where: { status: {$not: '3'}, activity_share_type: '2' },
                include:[
                    {model: RentalActivities, 
                        where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : null, user_id: req.decoded_data.id }, required: false,
                        include:[
                            {model: Activities},
                            {model: Brands},
                            {model: Models},
                        ],
                    },
                    {model: RentalActivityHistories, 
                        where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : {$not: null}, user_id: req.decoded_data.id }, required: false,
                        include: [
                            {model: Activities},
                            {model: Brands},
                            {model: Models},
                        ],
                    },
                    {model: Users},
                ]
            });
            if (rentalBookingActivities.length) {
                var newData = [];
                for await (const [index, val] of rentalBookingActivities.entries()) {
                    newData.push({
                        id: val.id,
                        activity_category: 'Rental',
                        quantity: val.quantity,
                        price_type: val.price_type,
                        price: val.price,
                        total_price: val.total_price,
                        start_date: val.start_date,
                        end_date: val.end_date,
                        start_time: val.start_time,
                        end_time: val.end_time,
                        is_pickup: val.is_pickup,
                        status: val.status,
                        createdAt: val.createdAt,
                        rental_activity: {
                            title: val.rental_activity_history?.title ||  val.rental_activity?.title,
                            activity: {
                                title: val.rental_activity_history?.activity.title || val.rental_activity?.activity.title,
                            },
                            brand: {
                                name: val.rental_activity_history?.brand.name || val.rental_activity?.brand.name,
                            },
                            model: {
                                name: val.rental_activity_history?.model.name || val.rental_activity?.model.name,
                                type: val.rental_activity_history?.model.type || val.rental_activity?.model.type,
                            }
                        },
                        user: val?.user ? {
                            first_name: val.user.first_name,
                            last_name: val.user.last_name,
                            email: val.user.email,
                            country_code: val.user.country_code,
                            mobile_no : val.user.mobile_no,
                        } : null,
                    });
                }
                newData = newData.sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
                return res.status(200).json({
                    status: 200,
                    data: newData,
                    message: 'Bookings fetch successfully.',
                    error: null
                });
            } else{
                return res.status(200).json({
                    status: 200,
                    data: [],
                    message: 'No data found.',
                    error: null
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
 * @params:      
 * @purpose:     To get booking details
*/
controller.getBookingDetails  = async (req, res) => {
    try {
        var bookingDetail = {};
        if(req.params.activity_category == "Adventure"){
            var bookingDetail = await Bookings.findOne({
                where: {status: {$not: '3'}, id: req.params.id, activity_share_type: '1'},
                include:[
                    {model: BookingAddOns, include: [{model: ActivityAddOns}]},
                    {model: BookingPayments},
                    {model: AdventureActivities, 
                        where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : null, user_id: req.decoded_data.id }, required: false,
                        include: [
                            {model: Activities},
                            {model: ActivityAdventureTypes},
                            {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                            {model: ActivityPrices, where: { activity_share_type: '1' }, required: false},
                            {model: ActivityRequireAccessories, where: { activity_share_type: '1' }, required: false},
                            {model: ActivityAddOns,
                                include: [{ model: BookingAddOns, 
                                    include: [{
                                        model: Bookings, 
                                        attributes: [],
                                        where: { activity_share_type: '1', status:{$in:['1','2']} }, required: true
                                    }] 
                                }], 
                                where: { activity_share_type: '1' }, required: false
                            },
                            {model: ActivityMeetingPoints},
                            {model: ActivityAdventureListDates},
                        ],
                    },
                    {model: AdventureActivityHistories,
                        where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : {$not: null}, user_id: req.decoded_data.id }, required: false,
                        include: [
                            {model: Activities},
                            {model: ActivityAdventureTypes},
                            {model: ActivityMediaHistories, where: { activity_share_type: '1' }, required: false},
                            {model: ActivityPriceHistories, where: { activity_share_type: '1' }, required: false},
                            {model: ActivityRequireAccessoryHistories, where: { activity_share_type: '1' }, required: false},
                            {model: ActivityAddOnHistories, 
                                include: [{ model: BookingAddOns, 
                                    include: [{
                                        model: Bookings, 
                                        attributes: [],
                                        where: { activity_share_type: '1', status:{$in:['1','2']} }, required: true
                                    }] 
                                }],
                                where: { activity_share_type: '1' }, required: false
                            },
                            {model: ActivityMeetingPointHistories},
                            {model: ActivityAdventureListDateHistories},
                        ]
                    },
                    {model: Users},
                    {model: RatingReviews},
                ]
            });
            if(bookingDetail){
                let videoData = bookingDetail?.adventure_activity_history?.activity_media_histories?.find(v => v.media_type == '2') || bookingDetail?.adventure_activity?.activity_media?.find(v => v.media_type == '2');
                let noOfPersonPrice = bookingDetail.adventure_activity_history?.activity_price_histories?.filter(v => v.rate_type == '3') || bookingDetail.adventure_activity?.activity_prices?.filter(v => v.rate_type == '3');
                let activityMedia = bookingDetail.adventure_activity_history?.activity_media_histories || bookingDetail.adventure_activity?.activity_media;
                let activityRequireAccessories = bookingDetail.adventure_activity_history?.activity_require_accessory_histories || bookingDetail.adventure_activity?.activity_require_accessories;
                let activityAddOns = bookingDetail.adventure_activity_history?.activity_add_on_histories || bookingDetail.adventure_activity?.activity_add_ons;
                let listDates = bookingDetail.adventure_activity_history?.activity_adventure_list_date_histories || bookingDetail.adventure_activity?.activity_adventure_list_dates;
                let BDAA = bookingDetail.adventure_activity_history || bookingDetail.adventure_activity;
                BDAA.activity_meeting_point = BDAA.activity_meeting_point_history || BDAA.activity_meeting_point;

                var newData = {
                    id: bookingDetail.id,
                    activity_category: 'Adventure',
                    quantity: bookingDetail.quantity,
                    price_type: bookingDetail.price_type,
                    price: bookingDetail.price,
                    total_price: bookingDetail.total_price,
                    start_date: bookingDetail.start_date,
                    end_date: bookingDetail.end_date,
                    start_time: bookingDetail.start_time,
                    end_time: bookingDetail.end_time,
                    status: bookingDetail.status,
                    createdAt: bookingDetail.createdAt,
                    booking_add_ons: bookingDetail.booking_add_ons?.map(v => {
                        return {
                            id: v.id,
                            quantity: v.quantity,
                            activity_add_on: v?.activity_add_on,
                        }
                    }),
                    booking_payment: bookingDetail?.booking_payment,
                    adventure_activity: {
                        id: BDAA.id,
                        title: BDAA.title,
                        level: BDAA.level,
                        altitude_depth_height: BDAA.altitude_depth_height,
                        age_from: BDAA.age_from,
                        age_to: BDAA.age_to,
                        language: BDAA.language,
                        description: BDAA.description,
                        warning: BDAA.warning,
                        activity_type: BDAA.activity_type,
                        language: BDAA.language,
                        is_pickup: BDAA.is_pickup,
                        is_website: BDAA.is_website,
                        website_link: BDAA.website_link,
                        single_day_categories: BDAA.single_day_categories,
                        is_provide_all_parts: BDAA.is_provide_all_parts,
                        is_approved: BDAA.is_approved,
                        status: BDAA.status,
                        meeting_point_id: BDAA.activity_meeting_point?.id,
                        is_extra_charges: BDAA.activity_meeting_point?.is_extra_charges,
                        address_line_one: BDAA.activity_meeting_point?.address_line_one,
                        address_line_two: BDAA.activity_meeting_point?.address_line_two,
                        landmark: BDAA.activity_meeting_point?.landmark,
                        country: BDAA.activity_meeting_point?.country,
                        state: BDAA.activity_meeting_point?.state,
                        city: BDAA.activity_meeting_point?.city,
                        pin_code: BDAA.activity_meeting_point?.pin_code,
                        latitude: BDAA.activity_meeting_point?.latitude,
                        longitude: BDAA.activity_meeting_point?.longitude,
                        location: BDAA.activity_meeting_point?.location,
                        activity: BDAA.activity ? {
                            id: BDAA.activity.id,
                            title: BDAA.activity.title,
                            image: BDAA.activity.image,
                            status: BDAA.activity.status,
                        } : null,
                        activity_adventure_type: BDAA.activity_adventure_type ? {
                            id: BDAA.activity_adventure_type.id,
                            name: BDAA.activity_adventure_type.name,
                            status: BDAA.activity_adventure_type.status
                        } : null,
                        images: activityMedia?.filter(v => v.media_type == '1').map(v => {
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
                        price: noOfPersonPrice?.map(v => {
                            return {
                                id: v.id,
                                no_of_person: v.no_of_person,
                                amount: v.amount,
                                status: v.status
                            }
                        }),
                        what_to_take: activityRequireAccessories?.filter(v => v.accessories_medium == '1').map(v => {
                            return {
                                id: v.id,
                                name: v.name,
                                status: v.status
                            }
                        }),
                        thing_service_included: activityRequireAccessories?.filter(v => v.accessories_medium == '2').map(v => {
                            return {
                                id: v.id,
                                name: v.name,
                                status: v.status
                            }
                        }),
                        add_ons: activityAddOns?.map(v => {
                            return {
                                id: v.id,
                                item: v.item_name,
                                price: v.item_price,
                                quantity: v.quantity - v.booking_add_ons.reduce((a, b) => a + b.quantity, 0),
                                status: v.status
                            }
                        }),
                        list_date: listDates?.map(v => {
                            return {
                                id: v.id,
                                start_date: v.start_date,
                                end_date: v.end_date,
                                status: v.status
                            }
                        }),
                    },
                    user: bookingDetail?.user ? {
                        first_name: bookingDetail.user.first_name,
                        last_name: bookingDetail.user.last_name,
                        email: bookingDetail.user.email,
                        country_code: bookingDetail.user.country_code,
                        mobile_no : bookingDetail.user.mobile_no,
                        gender : bookingDetail.user.gender,
                        dob : bookingDetail.user.dob,
                        country : bookingDetail.user.country,
                        state : bookingDetail.user.state,
                        city : bookingDetail.user.city,
                        address : bookingDetail.user.address,
                        landmark : bookingDetail.user.landmark,
                        image : bookingDetail.user.image,
                    } : null,
                    rating_review: {
                        id: bookingDetail.rating_review?.id,
                        rating: bookingDetail.rating_review?.rating,
                        review: bookingDetail.rating_review?.review,
                    }
                }
            }
        } else if(req.params.activity_category == "Rental"){
            var bookingDetail = await Bookings.findOne({where: {status: {$not: '3'}, id: req.params.id, activity_share_type: '2'},
                include:[
                    {model: BookingAddOns, include: [{model: ActivityAddOns}]},
                    {model: BookingPayments},
                    {model: RentalActivities, 
                        where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : null, user_id: req.decoded_data.id }, required: false,
                        include: [
                            {model: Activities},
                            {model: Brands},
                            {model: Models},
                            {model: ActivityVehicleDetails, where: { activity_share_type: '2' }, required: false},
                            {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                            {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
                            {model: ActivityRequireAccessories, where: { activity_share_type: '2' }, required: false}, 
                            {model: ActivityAddOns, 
                                include: [{ model: BookingAddOns, 
                                    include: [{
                                        model: Bookings, 
                                        attributes: [],
                                        where: { activity_share_type: '1', status:{$in:['1','2']} }, required: true
                                    }] 
                                }],
                                where: { activity_share_type: '2' }, required: false
                            }
                        ],
                        required: false
                    },
                    {model: RentalActivityHistories, 
                        where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : {$not: null}, user_id: req.decoded_data.id }, required: false,
                        include: [
                            {model: Activities},
                            {model: Brands},
                            {model: Models},
                            {model: ActivityVehicleDetailHistories, where: { activity_share_type: '2' }, required: false},
                            {model: ActivityMediaHistories, where: { activity_share_type: '2',  media_type: '1' }, required: false},
                            {model: ActivityPriceHistories, where: { activity_share_type: '2' }, required: false}, 
                            {model: ActivityRequireAccessoryHistories, where: { activity_share_type: '2' }, required: false},
                            {model: ActivityAddOnHistories, 
                                include: [{ model: BookingAddOns, 
                                    include: [{
                                        model: Bookings, 
                                        attributes: [],
                                        where: { activity_share_type: '1', status:{$in:['1','2']} }, required: true
                                    }] 
                                }],
                                where: { activity_share_type: '2' }, required: false
                            }
                        ],
                    },
                    {model: Users},
                    {model: RatingReviews},
                ]
            });
            if (bookingDetail) {
                let videoData = bookingDetail.rental_activity_history?.activity_media_histories?.find(v => v.media_type == '2') || bookingDetail.rental_activity?.activity_media?.find(v => v.media_type == '2');
                let perHourData = bookingDetail.rental_activity_history?.activity_price_histories.find(v => v.rate_type == '1') || bookingDetail.rental_activity?.activity_prices.find(v => v.rate_type == '1');
                let perDayData = bookingDetail.rental_activity_history?.activity_price_histories.find(v => v.rate_type == '2') || bookingDetail.rental_activity?.activity_prices.find(v => v.rate_type == '2');
                let activityVehicleDetails = bookingDetail.rental_activity_history?.activity_vehicle_detail_histories || bookingDetail.rental_activity?.activity_vehicle_details;
                let activityMedia = bookingDetail.rental_activity_history?.activity_media_histories || bookingDetail.rental_activity?.activity_media;
                let activityRequireAccessories = bookingDetail.rental_activity_history?.activity_require_accessory_histories || bookingDetail.rental_activity?.activity_require_accessories;
                let activityAddOns = bookingDetail.rental_activity_history?.activity_add_on_histories || bookingDetail.rental_activity?.activity_add_ons;
                var newData = {
                    id: bookingDetail.id,
                    activity_category: 'Rental',
                    quantity: bookingDetail.quantity,
                    price_type: bookingDetail.price_type,
                    price: bookingDetail.price,
                    total_price: bookingDetail.total_price,
                    start_date: bookingDetail.start_date,
                    end_date: bookingDetail.end_date,
                    start_time: bookingDetail.start_time,
                    end_time: bookingDetail.end_time,
                    status: bookingDetail.status,
                    createdAt: bookingDetail.createdAt,
                    booking_add_ons: bookingDetail.booking_add_ons?.map(v => {
                        return {
                            id: v.id,
                            quantity: v.quantity,
                            activity_add_on: v?.activity_add_on,
                        }
                    }),
                    booking_payment: bookingDetail?.booking_payment,
                    rental_activity: {
                        id: bookingDetail.rental_activity_history?.id || bookingDetail.rental_activity?.id,
                        title: bookingDetail.rental_activity_history?.title || bookingDetail.rental_activity?.title,
                        quantity: bookingDetail.rental_activity_history?.quantity || bookingDetail.rental_activity?.quantity,
                        description: bookingDetail.rental_activity_history?.description || bookingDetail.rental_activity?.description,
                        warning: bookingDetail.rental_activity_history?.warning || bookingDetail.rental_activity?.warning,
                        is_approved: bookingDetail.rental_activity_history?.is_approved || bookingDetail.rental_activity?.is_approved,
                        status: bookingDetail.rental_activity_history?.status || bookingDetail.rental_activity?.status,
                        activity: {
                            id: bookingDetail.rental_activity_history?.activity.id || bookingDetail.rental_activity?.activity.id,
                            title: bookingDetail.rental_activity_history?.activity.title || bookingDetail.rental_activity?.activity.title,
                            image: bookingDetail.rental_activity_history?.activity.image || bookingDetail.rental_activity?.activity.image,
                            status: bookingDetail.rental_activity_history?.activity.status || bookingDetail.rental_activity?.activity.status,
                        },
                        brand: {
                            id: bookingDetail.rental_activity_history?.brand.id || bookingDetail.rental_activity?.brand.id,
                            name: bookingDetail.rental_activity_history?.brand.name || bookingDetail.rental_activity?.brand.name,
                            status: bookingDetail.rental_activity_history?.brand.status || bookingDetail.rental_activity?.brand.status,
                        },
                        model: {
                            id: bookingDetail.rental_activity_history?.model.id || bookingDetail.rental_activity?.model.id,
                            name: bookingDetail.rental_activity_history?.model.name || bookingDetail.rental_activity?.model.name,
                            type: bookingDetail.rental_activity_history?.model.type || bookingDetail.rental_activity?.model.type,
                            status: bookingDetail.rental_activity_history?.model.status || bookingDetail.rental_activity?.model.status,
                        },
                        vehicle_details: activityVehicleDetails?.map(v => {
                            return {
                                id: v.id,
                                year: v.year,
                                registration_no: v.registration_no,
                                status: v.status
                            }
                        }),
                        images: activityMedia?.filter(v => v.media_type == '1').map(v => {
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
                        price: {
                            per_hour: {
                                id: perHourData.id,
                                amount: perHourData.amount,
                                status: perHourData.status
                            }, 
                            per_day: {
                                id: perDayData.id,
                                amount: perDayData.amount,
                                status: perDayData.status
                            }
                        },
                        what_to_take: activityRequireAccessories?.filter(v => v.accessories_medium == '1').map(v => {
                            return {
                                id: v.id,
                                name: v.name,
                                status: v.status
                            }
                        }),
                        thing_service_included: activityRequireAccessories?.filter(v => v.accessories_medium == '2').map(v => {
                            return {
                                id: v.id,
                                name: v.name,
                                status: v.status
                            }
                        }),
                        add_ons: activityAddOns?.map(v => {
                            return {
                                id: v.id,
                                item: v.item_name,
                                price: v.item_price,
                                quantity: v.quantity - v.booking_add_ons.reduce((a, b) => a + b.quantity, 0),
                                status: v.status
                            }
                        }),
                    },
                    user: bookingDetail?.user ? {
                        first_name: bookingDetail.user.first_name,
                        last_name: bookingDetail.user.last_name,
                        email: bookingDetail.user.email,
                        country_code: bookingDetail.user.country_code,
                        mobile_no : bookingDetail.user.mobile_no,
                        gender : bookingDetail.user.gender,
                        dob : bookingDetail.user.dob,
                        country : bookingDetail.user.country,
                        state : bookingDetail.user.state,
                        city : bookingDetail.user.city,
                        address : bookingDetail.user.address,
                        landmark : bookingDetail.user.landmark,
                        image : bookingDetail.user.image,
                    } : null,
                    rating_review: {
                        id: bookingDetail.rating_review?.id,
                        rating: bookingDetail.rating_review?.rating,
                        review: bookingDetail.rating_review?.review,
                    }
                }
            }
        }
        if(bookingDetail){
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Booking detail fetch successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: {},
                message: 'No data found.',
                error: null
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
 * @purpose:     To completed user booking
*/
controller.completedBooking  = async (req, res) => {
    try {
        var isExistBooking = null;
        if(req.params.activity_category == 'Adventure'){
            isExistBooking = await Bookings.findOne({ 
                attributes: ['id', 'activity_share_type', 'activity_share_fk', 'status'],
                where: { id: req.params.id, activity_share_type: '1', status: '2' },
                include:[{model: AdventureActivities, attributes: [], where: { '$bookings.activity_share_type$' : '1', user_id: req.decoded_data.id }, required: true }]
            });
        } else if(req.params.activity_category == 'Rental'){    
            isExistBooking = await Bookings.findOne({ 
                attributes: ['id', 'activity_share_type', 'activity_share_fk', 'status'],
                where: { id: req.params.id, activity_share_type: '2', status: '2' },
                include:[{model: RentalActivities, attributes: [], where: { '$bookings.activity_share_type$' : '2', user_id: req.decoded_data.id }, required: true }]
            });
        }
        if(isExistBooking){
            await Bookings.update({status: '4'}, { where: { id: req.params.id } });
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Booking completed successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Booking not exist.',
                error: true
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
 * @purpose:     To get inventory (Only for those vendor who involve in Adventure activity)
*/
controller.getInventory  = async (req, res) => {
    try {
        var data = await AdventureActivities.findAll({where: {user_id: req.decoded_data.id}, include:[
            {model: Activities, include: [{model: ActivityAdventureTypes}]},
            {model: ActivityTimeSheets, include: [{model: ActivityTimeSheetTimes}]},
            {model: ActivityDaySheets},
            {model: ActivityAdventureListDates},
        ]});
        if (data.length) {
            var newData = [];
            for await (const [i, val] of data.entries()) {
                let collectData = {    
                    id: val.id,
                    title: val.title,
                    activity_type: val.activity_type,
                    is_approved: val.is_approved,
                    status: val.status,
                    activity: {
                        id: val.activity.id,
                        title: val.activity.title,
                        status: val.activity.status,
                        activity_adventure_type: {
                            id: val.activity.activity_adventure_type.id,
                            name: val.activity.activity_adventure_type.name,
                            status: val.activity.activity_adventure_type.status,
                        }
                    },
                    list_date: val.activity_adventure_list_dates?.map(v => {
                        return {
                            id: v.id,
                            start_date: v.start_date,
                            end_date: v.end_date,
                            status: v.status
                        }
                    }),
                }
                if(val?.activity_time_sheets?.length) {
                    if(val.single_day_categories == '2') {
                        let collectTimeSheetTimeIds = [];
                        collectData.activity_time_sheet_times = [];
                        collectData.slot_bookings = [];
                        for await (const [index, value] of val.activity_time_sheets.entries()) {
                            collectTimeSheetTimeIds.push(value.activity_time_sheet_times?.map(v => {
                                return v.id;
                            }).find(x => true));
                            let existQuantity = await sequelize.query(`SELECT bookings.id, bookings.start_date, bookings.activity_share_fk, bookings.activity_slot_sheet_share_fk, bookings.status, CONCAT('[',GROUP_CONCAT(JSON_OBJECT(
                                'id',activity_time_sheet_times.id,
                                'start_time',activity_time_sheet_times.start_time,
                                'end_time',activity_time_sheet_times.end_time,
                                'quantity',activity_time_sheet_times.quantity,
                                'exist_quantity',(activity_time_sheet_times.quantity - IF(activity_time_sheet_times.id = bookings.activity_slot_sheet_share_fk, bookings.quantity, 0)),
                                'status',activity_time_sheet_times.status
                            )),']') AS activity_time_sheet_time_data, COALESCE(SUM(bookings.quantity),0) AS booked_quantity FROM bookings INNER JOIN activity_time_sheet_times ON bookings.activity_slot_sheet_share_fk = activity_time_sheet_times.id INNER JOIN activity_time_sheets ON activity_time_sheet_times.activity_time_sheet_id = activity_time_sheets.id WHERE bookings.activity_share_type = 1 AND bookings.activity_share_fk = '${val.id}' AND bookings.activity_slot_sheet_share_fk IN (${collectTimeSheetTimeIds}) AND bookings.status IN('1', '2') GROUP BY bookings.start_date`, {type: sequelize.QueryTypes.SELECT});
                            collectData.activity_time_sheet_times.push(value.activity_time_sheet_times?.map(v => {
                                return {
                                    activity_time_sheet_times_id: v.id,
                                    start_time: v.start_time,
                                    end_time: v.end_time,
                                    quantity: v.quantity,
                                    status: v.status
                                };
                            }).find(x => true));
                            collectData.slot_bookings.push(existQuantity?.map(v => {
                                return {
                                    date: v.start_date,
                                    booked_quantity: v.booked_quantity,
                                    status: v.status,
                                    time_slots: JSON.parse(v.activity_time_sheet_time_data)
                                };
                            }));
                        }
                    } else{
                        let ATS = val.activity_time_sheets[0];
                        collectData.slot_bookings = [];
                        let collectTimeSheetTimeIds = ATS.activity_time_sheet_times?.map(v => {
                            return v.id;
                        });
                        let existQuantity = await sequelize.query(`SELECT bookings.id, bookings.start_date, bookings.activity_share_fk, bookings.activity_slot_sheet_share_fk, bookings.status, CONCAT('[',GROUP_CONCAT(JSON_OBJECT(
                            'id',activity_time_sheet_times.id,
                            'start_time',activity_time_sheet_times.start_time,
                            'end_time',activity_time_sheet_times.end_time,
                            'quantity',activity_time_sheet_times.quantity,
                            'exist_quantity',( activity_time_sheet_times.quantity - IF(activity_time_sheet_times.id = bookings.activity_slot_sheet_share_fk, bookings.quantity, 0)),
                            'status',activity_time_sheet_times.status
                        )),']') AS activity_time_sheet_time_data, COALESCE(SUM(bookings.quantity),0) AS booked_quantity FROM bookings INNER JOIN activity_time_sheet_times ON bookings.activity_slot_sheet_share_fk = activity_time_sheet_times.id INNER JOIN activity_time_sheets ON activity_time_sheet_times.activity_time_sheet_id = activity_time_sheets.id WHERE bookings.activity_share_type = 1 AND bookings.activity_share_fk = '${val.id}' AND bookings.activity_slot_sheet_share_fk IN (${collectTimeSheetTimeIds}) AND bookings.status IN('1', '2') GROUP BY bookings.start_date`, {type: sequelize.QueryTypes.SELECT});
                        collectData.activity_time_sheet_times = ATS.activity_time_sheet_times?.map(v => {
                            return {
                                activity_time_sheet_times_id: v.id,
                                start_time: v.start_time,
                                end_time: v.end_time,
                                quantity: v.quantity,
                                status: v.status
                            };
                        })
                        collectData.slot_bookings.push(existQuantity?.map(v => {
                            return {
                                date: v.start_date,
                                booked_quantity: v.booked_quantity,
                                status: v.status,
                                time_slots: JSON.parse(v.activity_time_sheet_time_data)
                            };
                        }));
                    }
                }
                if(val?.activity_day_sheets?.length) {
                    collectData.activity_day_sheets = [];
                    collectData.slot_bookings = [];
                    let collectTimeSheetTimeIds = val.activity_day_sheets?.map(v => {
                        return v.id;
                    });
                    let existQuantity = await sequelize.query(`SELECT bookings.id, bookings.start_date, bookings.activity_share_fk, bookings.activity_slot_sheet_share_fk, bookings.status, CONCAT('[',GROUP_CONCAT(JSON_OBJECT(
                        'id',activity_day_sheets.id,
                        'start_time',activity_day_sheets.duration,
                        'start_time',activity_day_sheets.start_date,
                        'end_time',activity_day_sheets.no_of_spot,
                        'quantity',activity_day_sheets.quantity,
                        'quantity',activity_day_sheets.start_time,
                        'quantity',activity_day_sheets.end_time,
                        'exist_quantity',( activity_day_sheets.quantity - IF(activity_day_sheets.id = bookings.activity_slot_sheet_share_fk, bookings.quantity, 0)),
                        'status',activity_day_sheets.status
                    )),']') AS activity_day_sheet_data, COALESCE(SUM(bookings.quantity),0) AS booked_quantity FROM bookings INNER JOIN activity_day_sheets ON bookings.activity_share_fk = activity_day_sheets.adventure_activity_id AND bookings.activity_slot_sheet_share_fk = activity_day_sheets.id WHERE bookings.activity_share_type = 1 AND bookings.activity_share_fk = '${val.id}' AND bookings.activity_slot_sheet_share_fk IN (${collectTimeSheetTimeIds}) AND bookings.status IN('1', '2') GROUP BY bookings.start_date`, {type: sequelize.QueryTypes.SELECT});
                    for await (const [indx, ADS] of val.activity_day_sheets.entries()) {
                        collectData.activity_day_sheets.push({
                            activity_day_sheet_id: ADS.id,
                            duration: ADS.duration,
                            start_date: ADS.start_date,
                            quantity: ADS.quantity,
                            start_time: ADS.start_time,
                            end_time: ADS.end_time,
                            status: ADS.status 
                        })
                    }
                    collectData.slot_bookings.push(existQuantity?.map(v => {
                        return {
                            date: v.start_date,
                            booked_quantity: v.booked_quantity,
                            status: v.status,
                            day_slots: JSON.parse(v.activity_day_sheet_data)
                        };
                    }));
                }
                newData.push(collectData);
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Adventure activities inventory fetch successfully.',
                error: null
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
                error: null
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
 * @params:      Id
 * @purpose:     To inventory (slot Active/Close) update status
*/
controller.inventoryUpdateStatus = async (req, res) => {
    try {
        if(req.body.activity_type == '1'){
            await ActivityTimeSheetTimes.update({status: req.body.status}, {where: {id: req.params.id}})
        } else if(req.body.activity_type == '2'){
            await ActivityDaySheets.update({status: req.body.status}, {where: {id: req.params.id}})
        }
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Slot status updated successfully.',
            error: null
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
 * @params:      
 * @purpose:     To get vendor dashboard data
*/
controller.dashboard = async (req, res) => {
    try {
        var activitiesCount = 0;
        var bookingsCount = 0;
        var inProgressBookingsCount = 0;
        var completedBookingsCount = 0;
        var cancelledBookingsCount = 0;
        if(req.decoded_data?.vendor_business_detail?.category_id == '1') {
            var activitiesIds =  await AdventureActivities.findAll({
                attributes: ['id'],
                where: {
                    user_id: req.decoded_data.id,
                }}).then(val => val.map(v => v.id));
            activitiesCount = await AdventureActivities.count();
            bookingsCount = await Bookings.count({ where: { activity_share_type: '1', activity_share_fk: { $in: activitiesIds}, status: {$not: '3'} } });
            inProgressBookingsCount = await Bookings.count({ where: { activity_share_type: '1', activity_share_fk: { $in: activitiesIds}, status: {$in: ['1','2']} } });
            completedBookingsCount = await Bookings.count({ where: { activity_share_type: '1', activity_share_fk: { $in: activitiesIds}, status: 4 } });
            cancelledBookingsCount = await Bookings.count({ where: { activity_share_type: '1', activity_share_fk: { $in: activitiesIds}, status: 5 } });
        } else if(req.decoded_data?.vendor_business_detail?.category_id == '2') { 
            var activitiesIds =  await RentalActivities.findAll({
                attributes: ['id'],
                where: {
                    user_id: req.decoded_data.id,
                }}).then(val => val.map(v => v.id));
            activitiesCount = await RentalActivities.count();
            bookingsCount = await Bookings.count({ where: { activity_share_type: '2', activity_share_fk: { $in: activitiesIds}, status: {$not: '3'} } });
            inProgressBookingsCount = await Bookings.count({ where: { activity_share_type: '2', activity_share_fk: { $in: activitiesIds}, status: {$in: ['1','2']} } });
            completedBookingsCount = await Bookings.count({ where: { activity_share_type: '2', activity_share_fk: { $in: activitiesIds}, status: 4 } });
            cancelledBookingsCount = await Bookings.count({ where: { activity_share_type: '2', activity_share_fk: { $in: activitiesIds}, status: 5 } });
        }
        return res.status(200).json({
            status: 200,
            data: {
                activities_count: activitiesCount,
                total_earned_amount: 0,
                bookings_count: bookingsCount,
                inprogress_bookings_count: inProgressBookingsCount,
                completed_bookings_count: completedBookingsCount,
                cancelled_bookings_count: cancelledBookingsCount,
            },
            message: 'Data fetch successfully.',
            error: null
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
 * @params:      
 * @purpose:     To get ledger
*/
controller.ledger = async (req, res) => {
    try{
        if(req.decoded_data.vendor_business_detail.category_id == '1'){
            var bookingPaymentIds = await AdventureActivities.findOne({
                attributes: ['user_id'],
                where: {user_id: req.decoded_data.id},
                include: [{model: Bookings, attributes: ['id'], where: {activity_share_type: '1'}, required: true, include: [{model: BookingPayments, attributes: ['id']}] }]
            }).then(val => val?.bookings.map(v => v?.booking_payment?.id));
        } else{
            var bookingPaymentIds = await RentalActivities.findOne({
                attributes: ['user_id'],
                where: {user_id: req.decoded_data.id},
                include: [{model: Bookings, attributes: ['id'], where: {activity_share_type: '2'}, required: true, include: [{model: BookingPayments, attributes: ['id']}] }]
            }).then(val => val?.bookings.map(v => v?.booking_payment?.id));
        }
        if(bookingPaymentIds?.length){
            await Transactions.findAll({ where: {booking_payment_id: {$in: bookingPaymentIds} } }).then(data => {
                return res.status(200).json({
                    status: 200,
                    data: data,
                    message: 'Ledger fetch successfully.',
                    error: null
                });
            }).catch(error => {
                return res.status(500).json({
                    status: 500,
                    data: null,
                    message: 'Somthing went wrong.',
                    error: error,
                });
            });
        } else{
            return res.status(200).json({
                status: 200,
                data: [],
                message: 'No data found.',
                error: null
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