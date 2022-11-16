const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const Razorpay = require('razorpay');
var moment = require('moment');

const { validationResult } = require('express-validator');

const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const vendorBusinessDetails = require('../../model/vendor_business_details')(sequelize, DataTypes);
const LocationImages = require('../../model/location_images')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const Brands = require('../../model/brands')(sequelize, DataTypes);
const Models = require('../../model/models')(sequelize, DataTypes);
const AdventureActivities = require('../../model/adventure_activities')(sequelize, DataTypes);
const AdventureActivityHistories = require('../../model/adventure_activity_histories')(sequelize, DataTypes);
const ActivityAdventureTypes = require('../../model/activity_adventure_types')(sequelize, DataTypes);
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
const ActivityMeetingPoints = require('../../model/activity_meeting_points')(sequelize, DataTypes);
const ActivityMeetingPointHistories = require('../../model/activity_meeting_point_histories')(sequelize, DataTypes);
const ActivityTimeSheets = require('../../model/activity_time_sheets')(sequelize, DataTypes);
const ActivityAutoTimeSheets = require('../../model/activity_auto_time_sheets')(sequelize, DataTypes);
const ActivityFlexdTimeSheets = require('../../model/activity_flexd_time_sheets')(sequelize, DataTypes);
const ActivityTimeSheetTimes = require('../../model/activity_time_sheet_times')(sequelize, DataTypes);
const ActivityDaySheets = require('../../model/activity_day_sheets')(sequelize, DataTypes);
const ActivityDaySheetDays = require('../../model/activity_day_sheet_days')(sequelize, DataTypes);
const ActivityAdventureListDates = require('../../model/activity_adventure_list_dates')(sequelize, DataTypes);
const ActivityAdventureListDateHistories = require('../../model/activity_adventure_list_date_histories')(sequelize, DataTypes);
const Bookings = require('../../model/bookings')(sequelize, DataTypes);
const BookingAddOns = require('../../model/booking_add_ons')(sequelize, DataTypes);
const BookingReferrals = require('../../model/booking_referrals')(sequelize, DataTypes);
const Referrals = require('../../model/referrals')(sequelize, DataTypes);
const RazorpayCustomer = require('../../model/razorpay_customers')(sequelize, DataTypes);
const BookingPayments = require('../../model/booking_payments')(sequelize, DataTypes);
const BookingRefunds = require('../../model/booking_refunds')(sequelize, DataTypes);
const Transactions = require('../../model/transactions')(sequelize, DataTypes);
const TaxiDriverBusinessDetails = require('../../model/taxi_driver_business_details')(sequelize, DataTypes);
const TaxiRateLists = require('../../model/taxi_rate_lists')(sequelize, DataTypes);
const TaxiBookings = require('../../model/taxi_bookings')(sequelize, DataTypes);
const RatingReviews = require('../../model/rating_reviews')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const { parse } = require('dotenv');

const Role = new RoleService();

Users.hasOne(vendorBusinessDetails, {
    foreignKey: 'user_id'
});

Users.hasOne(TaxiDriverBusinessDetails, {
    foreignKey: 'user_id'
});

TaxiDriverBusinessDetails.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

TaxiDriverBusinessDetails.belongsTo(Models, {
    foreignKey: 'model_id'
});

Activities.hasMany(AdventureActivities, {
    foreignKey: 'activity_id'
});

Activities.hasMany(RentalActivities, {
    foreignKey: 'activity_id'
});

vendorBusinessDetails.belongsTo(LocationImages, {
    foreignKey: 'location_image_id'
});

AdventureActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

AdventureActivityHistories.belongsTo(Users, {
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

RentalActivities.belongsTo(Users, {
    foreignKey: 'user_id'
});

RentalActivityHistories.belongsTo(Users, {
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

RentalActivities.hasMany(ActivityAddOns, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityAddOnHistories, {
    foreignKey: 'activity_share_history_fk'
});

RentalActivities.hasMany(ActivityRequireAccessories, {
    foreignKey: 'activity_share_fk'
});

RentalActivityHistories.hasMany(ActivityRequireAccessoryHistories, {
    foreignKey: 'activity_share_history_fk'
});

ActivityAddOns.hasMany(BookingAddOns, {
    foreignKey: 'activity_add_on_id'
});

ActivityAddOnHistories.hasMany(BookingAddOns, {
    foreignKey: 'activity_add_on_id',
    targetKey: "activity_add_on_id",
});

BookingAddOns.belongsTo(Bookings, {
    foreignKey: 'booking_id'
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

Bookings.belongsTo(AdventureActivityHistories, {
    foreignKey: 'activity_share_fk'
});

AdventureActivities.hasMany(Bookings, {
    foreignKey: 'activity_share_fk'
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

RentalActivityHistories.hasMany(Bookings, {
    foreignKey: 'activity_share_fk'
});

BookingPayments.hasOne(Transactions, {
    foreignKey: 'booking_payment_id'
});

Bookings.belongsTo(RazorpayCustomer, {
    foreignKey: 'user_id',
    targetKey: "user_id",
});

Users.hasMany(TaxiBookings, {
    foreignKey: 'driver_id'
});

TaxiBookings.belongsTo(Users, {
    foreignKey: 'driver_id'
});

Bookings.hasOne(RatingReviews, {
    foreignKey: 'booking_id'
});

Bookings.hasOne(BookingReferrals, {
    foreignKey: 'booking_id'
});

TaxiBookings.hasOne(RatingReviews, {
    foreignKey: 'taxi_booking_id'
});

RatingReviews.belongsTo(Users,{
    foreignKey: 'user_id'
});

const controller = {};

/**
 * @params:      
 * @purpose:     To check booking schedule by cron jobs
*/
controller.cronScheduleBooking = async (req, res) => {
    try {
        var pendingBookingIds = await Bookings.findAll({ where: { status: '1', createdAt: {$lte : moment().subtract(10, 'minutes')} } }).then(val => val.map(v => v.id));
        await Bookings.update({status: '3'}, { where: {id: {$in: pendingBookingIds} } });
        await BookingReferrals.update({status: '2'}, { where: {booking_id: {$in: pendingBookingIds} } });
        return true;
    } catch (err) {
        return err;
    }
}

/**
 * @params:      
 * @purpose:     To get activities places
*/
controller.getActivitiesPlaces = async (req, res) => {
    await Users.findAll({where: { role_id: '3', is_approved: '1', status: '1' }, attributes: ["state"], group: "state"}).then(data => {
        if (data.length) {
            var newData = [];
            data.forEach(val => {
                newData.push({
                    state: val.state,
                    image: config.BASE_URL + 'assets/images/default/'+val.state+'.jpg'
                });
            });
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activities places fetch successfully.',
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
 * @params:      
 * @purpose:     To get activities (sub categories) of state
*/
controller.getAllActivitiesOfState = async (req, res) => {
    try {
        let adventureActivities = await Activities.findAll({ 
            attributes: ['id', 'title', 'image', 'status'], 
            where: {status: '1', category_id: 1}, 
            include:[
                {model: AdventureActivities, attributes: [], where: { status: '1' }, required: true, 
                include: [{ model: Users, attributes: [], where: { state: req.params.state }, required: true, }] }
            ]
        });
        let rentalActivities = await Activities.findAll({ 
            attributes: ['id', 'title', 'image', 'status'], 
            where: {status: '1', category_id: 2}, 
            include:[
                {model: RentalActivities, attributes: [], where: { status: '1' }, required: true, 
                include: [{ model: Users, attributes: [], where: { state: req.params.state }, required: true, }] }
            ]
        });
        if (adventureActivities.length || rentalActivities.length) {
            var newData = [];
            for await (const [index, val] of adventureActivities.entries()) {
                newData.push({
                    id: val.id,
                    activity_category: 'Adventure',
                    title: val.title,
                    image: val.image,
                    status: val.status,
                });
            }
            for await (const [index, val] of rentalActivities.entries()) {
                newData.push({
                    id: val.id,
                    activity_category: 'Rental',
                    title: val.title,
                    image: val.image,
                    status: val.status,
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activities fetch successfully.',
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
 * @params:      
 * @purpose:     To get rental & adventure activities
*/
controller.getAllRentalAdventureActivities = async (req, res) => {
    try {
        let adventurePopularActivities = await AdventureActivities.findAll({
            attributes: ['id', 'title', 'status'],
            where: { is_approved: '1', status: '1' }, 
            include:[
                {model: Bookings, 
                    attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                    include: [
                        {model: RatingReviews,
                            attributes: ['booking_id', 'rating', 'review'],
                            where: { 'booking_id' : {$not: null} },
                            required: true,
                        }
                    ],
                    where: { activity_share_type: '1' }, required: false
                },
                {model: Users, 
                    attributes: ['state'],
                    include: [{model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']}]
                },
                {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
            ]
        });
        let rentalPopularActivities = await RentalActivities.findAll({
            attributes: ['id', 'title', 'status'],
            where: { is_approved: '1', status: '1' }, 
            include:[
                {model: Bookings, 
                    attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                    include: [
                        {model: RatingReviews,
                            attributes: ['booking_id', 'rating', 'review'],
                            where: { 'booking_id' : {$not: null} },
                            required: true,
                        }
                    ],
                    where: { activity_share_type: '2' }, required: false
                },
                {model: Users, 
                    attributes: ['state'],
                    include: [{model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']}]
                },
                {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            ]
        });
        if (adventurePopularActivities.length || rentalPopularActivities.length) {
            var newData = [];
            for await (const [i, val] of adventurePopularActivities.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                newData.push({
                    id: val.id,
                    activity_category: 'Adventure',
                    title: val.title,
                    status: val.status,
                    state: val.user.state,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
                    price: val.activity_prices.filter(v => v.rate_type == '3').map(v => {
                        return {
                            id: v.id,
                            no_of_person: v.no_of_person,
                            amount: v.amount,
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
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            }
            for await (const [i, val] of rentalPopularActivities.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                newData.push({
                    id: val.id,
                    activity_category: 'Rental',
                    title: val.title,
                    status: val.status,
                    state: val.user.state,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
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
                    images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                        return {
                            id: v.id,
                            media_path: v.media_path,
                            status: v.status
                        }
                    }),
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activities fetch successfully.',
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
 * @params:      
 * @purpose:     To get rental & adventure activities of state
*/
controller.getAllRentalAdventureActivitiesOfState = async (req, res) => {
    try {
        let adventurePopularActivities = await AdventureActivities.findAll({
            attributes: ['id', 'title', 'status'],
            where: { is_approved: '1', status: '1' }, 
            include:[
                {model: Bookings, 
                    attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                    include: [
                        {model: RatingReviews,
                            attributes: ['booking_id', 'rating', 'review'],
                            where: { 'booking_id' : {$not: null} },
                            required: true,
                        }
                    ],
                    where: { activity_share_type: '1' }, required: false
                },
                {model: Users, 
                    attributes: ['id', 'state'],
                    where: { state: req.params.state }, 
                    required: true, 
                    include: [ {model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']} ]
                },
                {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
            ]
        });
        let rentalPopularActivities = await RentalActivities.findAll({
            attributes: ['id', 'title', 'status'],
            where: { is_approved: '1', status: '1' }, 
            include:[
                {model: Bookings, 
                    attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                    include: [
                        {model: RatingReviews,
                            attributes: ['booking_id', 'rating', 'review'],
                            where: { 'booking_id' : {$not: null} },
                            required: true,
                        }
                    ],
                    where: { activity_share_type: '2' }, required: false
                },
                {model: Users, 
                    attributes: ['id', 'state'],
                    where: { state: req.params.state }, 
                    include: [ {model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']} ]
                },
                {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            ]
        });
        if (adventurePopularActivities.length || rentalPopularActivities.length) {
            var newData = [];
            for await (const [i, val] of adventurePopularActivities.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                newData.push({
                    id: val.id,
                    activity_category: 'Adventure',
                    title: val.title,
                    status: val.status,
                    state: val.user.state,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
                    price: val.activity_prices.filter(v => v.rate_type == '3').map(v => {
                        return {
                            id: v.id,
                            no_of_person: v.no_of_person,
                            amount: v.amount,
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
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            }
            for await (const [i, val] of rentalPopularActivities.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                newData.push({
                    id: val.id,
                    activity_category: 'Rental',
                    title: val.title,
                    state: val.user.state,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
                    status: val.status,
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
                    images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                        return {
                            id: v.id,
                            media_path: v.media_path,
                            status: v.status
                        }
                    }),
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activities fetch successfully.',
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
 * @params:      
 * @purpose:     To get activities of selected activity
*/
controller.getActivitiesOfSelectedActivity = async (req, res) => {
    try {
        var activityDetail = [];
        var newData = [];
        if(req.params.activity_category == "Adventure"){
            activityDetail = await AdventureActivities.findAll({
                attributes: ['id', 'title', 'activity_type', 'is_approved', 'status'],
                where: { activity_id: req.params.activity_id, is_approved: '1', status: '1' }, 
                include:[
                    {model: Bookings, 
                        attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                            }
                        ],
                        where: { activity_share_type: '1' }, required: false
                    },
                    {model: Users, 
                        attributes: ['country', 'state', 'city', 'image'],
                        include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]
                    },
                    {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                    {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}
                ]
            });
            if (activityDetail.length) {
                for await (const [index, val] of activityDetail.entries()) {
                    var rating = 0;
                    val.bookings.map(v => {
                        rating += parseInt(v.rating_review.rating)
                    })
                    newData.push({
                        id: val.id,
                        activity_category: 'Adventure',
                        title: val.title,
                        activity_type: val.activity_type,
                        is_approved: val.is_approved,
                        status: val.status,
                        user: {
                            country: val.user.country,
                            state: val.user.state,
                            city: val.user.city,
                            image: val.user.image,
                            vendor_business_detail: {
                                business_name: val.user.vendor_business_detail.business_name,
                                location: val.user.vendor_business_detail.location,
                                latitude: val.user.vendor_business_detail.latitude,
                                longitude: val.user.vendor_business_detail.longitude,
                            }
                        },
                        images: val?.activity_media?.filter(v => v.media_type == '1').map(v => {
                            return {
                                id: v.id,
                                media_path: v.media_path,
                                status: v.status
                            }
                        }),
                        price: val?.activity_prices?.filter(v => v.rate_type == '3').map(v => {
                            return {
                                id: v.id,
                                no_of_person: v.no_of_person,
                                amount: v.amount,
                                status: v.status
                            }
                        }),
                        rating: rating / (5 * val.bookings.length) * 5,
                        reviews: val.bookings.length
                    });
                }
            }
        } else if(req.params.activity_category == "Rental"){
            activityDetail = await RentalActivities.findAll({
                attributes: ['id', 'title', 'quantity', 'status'],
                where: { activity_id: req.params.activity_id, is_approved: '1', status: '1' }, 
                include:[
                    {model: Bookings, 
                        attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                            }
                        ],
                        where: { activity_share_type: '2' }, required: false
                    },
                    {model: Users, 
                        attributes: ['country', 'state', 'city', 'image'],
                        include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]
                    },
                    {model: Brands},
                    {model: Models},
                    {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                    {model: ActivityPrices, where: { activity_share_type: '2' }, required: false},
                ]
            });
            if (activityDetail.length) {
                for await (const [index, val] of activityDetail.entries()) {
                    var rating = 0;
                    val.bookings.map(v => {
                        rating += parseInt(v.rating_review.rating)
                    })
                    let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                    let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                    newData.push({
                        id: val.id,
                        activity_category: 'Rental',
                        title: val.title,
                        quantity: val.quantity,
                        status: val.status,
                        user: {
                            country: val.user.country,
                            state: val.user.state,
                            city: val.user.city,
                            vendor_business_detail: {
                                location: val.user?.vendor_business_detail.location,
                                latitude: val.user?.vendor_business_detail.latitude,
                                longitude: val.user?.vendor_business_detail.longitude,
                            }
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
                        images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                            return {
                                id: v.id,
                                media_path: v.media_path,
                                status: v.status
                            }
                        }),
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
                        rating: rating / (5 * val.bookings.length) * 5,
                        reviews: val.bookings.length
                    });
                }
            }
        }
        if (activityDetail.length) {
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activity detail fetch successfully.',
                error: null
            });
        } else {
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
 * @params:      
 * @purpose:     To get activities of selected activity by state
*/
controller.getActivitiesOfSelectedActivityByState = async (req, res) => {
    try {
        var activityDetail = [];
        var newData = [];
        if(req.params.activity_category == "Adventure"){
            activityDetail = await AdventureActivities.findAll({
                attributes: ['id', 'title', 'activity_type', 'is_approved', 'status'],
                where: { activity_id: req.params.activity_id, is_approved: '1', status: '1' }, 
                include:[
                    {model: Bookings, 
                        attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                            }
                        ],
                        where: { activity_share_type: '1' }, required: false
                    },
                    {model: Users, 
                        attributes: ['id', 'country', 'state', 'city', 'image'],
                        where: { state: req.params.state }, 
                        required: true, 
                        include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]},
                    {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                    {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}
                ]
            });
            if (activityDetail.length) {
                for await (const [index, val] of activityDetail.entries()) {
                    var rating = 0;
                    val.bookings.map(v => {
                        rating += parseInt(v.rating_review.rating)
                    })
                    newData.push({
                        id: val.id,
                        activity_category: 'Adventure',
                        title: val.title,
                        activity_type: val.activity_type,
                        is_approved: val.is_approved,
                        status: val.status,
                        user: {
                            country: val.user.country,
                            state: val.user.state,
                            city: val.user.city,
                            image: val.user.image,
                            vendor_business_detail: {
                                business_name: val.user.vendor_business_detail.business_name,
                                location: val.user.vendor_business_detail.location,
                                latitude: val.user.vendor_business_detail.latitude,
                                longitude: val.user.vendor_business_detail.longitude,
                            }
                        },
                        images: val?.activity_media?.filter(v => v.media_type == '1').map(v => {
                            return {
                                id: v.id,
                                media_path: v.media_path,
                                status: v.status
                            }
                        }),
                        price: val?.activity_prices?.filter(v => v.rate_type == '3').map(v => {
                            return {
                                id: v.id,
                                no_of_person: v.no_of_person,
                                amount: v.amount,
                                status: v.status
                            }
                        }),
                        rating: rating / (5 * val.bookings.length) * 5,
                        reviews: val.bookings.length
                    });
                }
            }
        } else if(req.params.activity_category == "Rental"){
            activityDetail = await RentalActivities.findAll({
                attributes: ['id', 'title', 'quantity', 'status'],
                where: { activity_id: req.params.activity_id, is_approved: '1', status: '1' }, 
                include:[
                    {model: Bookings, 
                        attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                            }
                        ],
                        where: { activity_share_type: '2' }, required: false
                    },
                    {model: Users, 
                        attributes: ['id', 'country', 'state', 'city', 'image'],
                        where: { state: req.params.state }, 
                        required: true, 
                        include: [ {model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']} ]},
                    {model: Brands},
                    {model: Models},
                    {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                    {model: ActivityPrices, where: { activity_share_type: '2' }, required: false},
                ]
            });
            if (activityDetail.length) {
                for await (const [index, val] of activityDetail.entries()) {
                    var rating = 0;
                    val.bookings.map(v => {
                        rating += parseInt(v.rating_review.rating)
                    })
                    let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                    let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                    newData.push({
                        id: val.id,
                        activity_category: 'Rental',
                        title: val.title,
                        quantity: val.quantity,
                        status: val.status,
                        user: {
                            country: val.user.country,
                            state: val.user.state,
                            city: val.user.city,
                            vendor_business_detail: {
                                location: val.user?.vendor_business_detail.location,
                                latitude: val.user?.vendor_business_detail.latitude,
                                longitude: val.user?.vendor_business_detail.longitude,
                            }
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
                        images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                            return {
                                id: v.id,
                                media_path: v.media_path,
                                status: v.status
                            }
                        }),
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
                        rating: rating / (5 * val.bookings.length) * 5,
                        reviews: val.bookings.length
                    });
                }
            }
        }
        if (activityDetail.length) {
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activity detail fetch successfully.',
                error: null
            });
        } else {
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
 * @params:      
 * @purpose:     To get all adventure activities
*/
controller.getAllAdventureActivities = async (req, res) => {
    await AdventureActivities.findAll({
        attributes: ['id', 'title', 'status'],
        where: { is_approved: '1', status: '1' }, 
        include:[
            {model: Bookings, 
                attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                include: [
                    {model: RatingReviews,
                        attributes: ['booking_id', 'rating', 'review'],
                        where: { 'booking_id' : {$not: null} },
                        required: true,
                    }
                ],
                where: { activity_share_type: '1' }, required: false
            },
            {model: Users, 
                attributes: ['id', 'state'],
                include: [ {model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']} ]},
            {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
            {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
        ]
    }).then(data => {
        if (data.length) {
            var newData = [];
            for (const [i, val] of data.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                newData.push({
                    id: val.id,
                    activity_category: 'Adventure',
                    title: val.title,
                    status: val.status,
                    state: val.user.state,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
                    price: val.activity_prices.filter(v => v.rate_type == '3').map(v => {
                        return {
                            id: v.id,
                            no_of_person: v.no_of_person,
                            amount: v.amount,
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
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
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
    });
}

/**
 * @params:      
 * @purpose:     To get all rental activities
*/
controller.getAllRentalActivities = async (req, res) => {
    await RentalActivities.findAll({
        attributes: ['id', 'title', 'status'],
        where: { is_approved: '1', status: '1' }, 
        include:[
            {model: Bookings, 
                attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                include: [
                    {model: RatingReviews,
                        attributes: ['booking_id', 'rating', 'review'],
                        where: { 'booking_id' : {$not: null} },
                        required: true,
                    }
                ],
                where: { activity_share_type: '2' }, required: false
            },
            {model: Users, 
                attributes: ['id', 'state'],
                include: [{model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']}]},
            {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
            {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
        ]
    }).then(data => {
        if (data.length) {
            var newData = [];
            for (const [i, val] of data.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                newData.push({
                    id: val.id,
                    activity_category: 'Rental',
                    title: val.title,
                    status: val.status,
                    state: val.user.state,
                    location: val.user.vendor_business_detail.location,
                    latitude: val.user.vendor_business_detail.latitude,
                    longitude: val.user.vendor_business_detail.longitude,
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
                    images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                        return {
                            id: v.id,
                            media_path: v.media_path,
                            status: v.status
                        }
                    }),
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            }
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
    });
}

/**
 * @params:      
 * @purpose:     To get popular activities
*/
controller.getPopularActivities = async (req, res) => {
    try {
        let adventurePopularActivities = await sequelize.query(`SELECT
        aa.id,
        (
            SELECT
                COUNT(*)
            FROM
                bookings
            WHERE
                bookings.activity_share_fk = aa.id AND bookings.activity_share_type = 1
        ) AS total_count,
        'Adventure' AS activity_category,
        aa.title,
        aa.status,
        u.state,
        vbd.location,
        vbd.latitude,
        vbd.longitude,
        CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', ap.id, 'no_of_person', ap.no_of_person, 'amount', ap.amount, 'status', ap.status)), ']') AS price,
        CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', am.id, 'media_path', am.media_path, 'status', ap.status)), ']') AS images,
        u.status AS user_status,
        am.id AS activity_media_id,
        am.id AS media_path,
        am.id AS activity_media_status,
    AVG(DISTINCT rr.rating) AS rating,
    COUNT(DISTINCT rr.rating) AS reviews 
    FROM
        adventure_activities aa
    INNER JOIN bookings b ON
        b.activity_share_fk = aa.id AND b.activity_share_type = 1
    INNER JOIN users u ON
        u.id = aa.user_id
    INNER JOIN vendor_business_details vbd ON
        vbd.user_id = u.id
    LEFT JOIN rating_reviews rr ON
        rr.booking_id = b.id
    INNER JOIN activity_media am ON
        am.activity_share_fk = aa.id AND am.activity_share_type = 1 AND am.media_type = '1'
    INNER JOIN activity_prices ap ON
        ap.activity_share_fk = aa.id AND ap.activity_share_type = 1 AND ap.rate_type = '3'
    GROUP BY
        aa.id;`, {type: sequelize.QueryTypes.SELECT});
        adventurePopularActivities = adventurePopularActivities.map(v => { 
            v.price = JSON.parse(v.price)
            v.images = JSON.parse(v.images)
            v.images = v.images.map(val => {
                val.media_path = config.BASE_URL + 'uploadImages/activityMedia/'+ val.media_path
                return val
            });
            return v
        });
        let rentalPopularActivities = await sequelize.query(`SELECT
        ra.id,
        (
            SELECT
                COUNT(*)
            FROM
                bookings
            WHERE
                bookings.activity_share_fk = ra.id AND bookings.activity_share_type = 2
        ) AS total_count,
        'Rental' AS activity_category,
        ra.title,
        ra.status,
        u.state,
        vbd.location,
        vbd.latitude,
        vbd.longitude,
        CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', ap.id, 'rate_type', ap.rate_type, 'amount', ap.amount, 'status', ap.status)), ']') AS price,
        CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('id', am.id, 'media_path', am.media_path, 'status', ap.status)), ']') AS images,
        u.status AS user_status,
        am.id AS activity_media_id,
        am.id AS media_path,
        am.id AS activity_media_status,
    AVG(DISTINCT rr.rating) AS rating,
    COUNT(DISTINCT rr.rating) AS reviews
    FROM
        rental_activities ra
    INNER JOIN bookings b ON
        b.activity_share_fk = ra.id AND b.activity_share_type = 2
    INNER JOIN users u ON
        u.id = ra.user_id
    INNER JOIN vendor_business_details vbd ON
        vbd.user_id = u.id
    LEFT JOIN rating_reviews rr ON
        rr.booking_id = b.id
    INNER JOIN activity_media am ON
        am.activity_share_fk = ra.id AND am.activity_share_type = 2 AND am.media_type = '1'
    INNER JOIN activity_prices ap ON
        ap.activity_share_fk = ra.id AND ap.activity_share_type = 2 AND ap.rate_type IN('1','2')
    GROUP BY
        ra.id;`, {type: sequelize.QueryTypes.SELECT});
        rentalPopularActivities = rentalPopularActivities.map(v => { 
            let price = JSON.parse(v.price)
            v.price = {
                'per_hour' : price.find(pVal => pVal.rate_type == '1'),
                'per_day' : price.find(pVal => pVal.rate_type == '2')
            }
            v.images = JSON.parse(v.images)
            v.images = v.images.map(val => {
                val.media_path = config.BASE_URL + 'uploadImages/activityMedia/'+ val.media_path
                return val
            });
            return v
        });
        if (adventurePopularActivities.length || rentalPopularActivities.length) {
            var newData = adventurePopularActivities.concat(rentalPopularActivities);
            newData = newData.sort((a, b) => {
                return b.total_count - a.total_count;
            })
            return res.status(200).json({
                status: 200,
                data: newData.slice(0, 6),
                message: 'Popular activities fetch successfully.',
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
 * @params:      state
 * @purpose:     To get popular activities by state
*/
controller.getPopularActivitiesByState = async (req, res) => {
    try {
        let adventurePopularActivities = await AdventureActivities.findAll({
            attributes: ['id', 'title', 'status'],
            where: { is_approved: '1', status: '1' }, 
            include:[
                {model: Bookings, where: { activity_share_type: '1' }, required: true},
                {model: Users, attributes: ['state'], 
                    include: [{model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']}], 
                    where: { state: req.params.state },
                    required: true
                },
                {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
            ]
        });
        let rentalPopularActivities = await RentalActivities.findAll({
            attributes: ['id', 'title', 'status'],
            where: { is_approved: '1', status: '1' },
            include:[
                {model: Bookings, where: { activity_share_type: '2' }, required: true},
                {model: Users, attributes: ['state'], 
                include: [
                    {model: vendorBusinessDetails, attributes: ['location', 'latitude', 'longitude']}
                ], 
                where: { state: req.params.state }, required: true},
                {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            ]
        });
        if (adventurePopularActivities.length || rentalPopularActivities.length) {
            var newData = [];
            for await (const [i, val] of adventurePopularActivities.entries()) {
                newData.push({
                    id: val.id,
                    total_count: val.bookings ? val.bookings.length : 0,
                    activity_category: 'Adventure',
                    title: val.title,
                    status: val.status,
                    state: val.user.state,
                    location: val.user.vendor_business_detail?.location,
                    latitude: val.user.vendor_business_detail?.latitude,
                    longitude: val.user.vendor_business_detail?.longitude,
                    price: val.activity_prices.filter(v => v.rate_type == '3').map(v => {
                        return {
                            id: v.id,
                            no_of_person: v.no_of_person,
                            amount: v.amount,
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
                });
            }
            for await (const [i, val] of rentalPopularActivities.entries()) {
                let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                newData.push({
                    id: val.id,
                    total_count: val.bookings ? val.bookings.length : 0,
                    activity_category: 'Rental',
                    title: val.title,
                    state: val.user.state,
                    location: val.user.vendor_business_detail?.location,
                    latitude: val.user.vendor_business_detail?.latitude,
                    longitude: val.user.vendor_business_detail?.longitude,
                    status: val.status,
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
                    images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                        return {
                            id: v.id,
                            media_path: v.media_path,
                            status: v.status
                        }
                    }),
                });
            }
            newData = newData.sort((a, b) => {
                return b.total_count - a.total_count;
            })
            return res.status(200).json({
                status: 200,
                data: newData.slice(0, 6),
                message: 'Popular activities fetch successfully.',
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
        console.log(err)
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      activity_category
 * @purpose:     To get popular activities by category
*/
controller.getPopularActivitiesByCategory = async (req, res) => {
    try {
        var newData = [];
        if(req.params.activity_category == "Adventure"){
            var adventurePopularActivities = await AdventureActivities.findAll({where: { is_approved: '1', status: '1' }, include:[
                {model: Bookings, where: { activity_share_type: '1' }, required: true},
                {model: Users, include: [{model: vendorBusinessDetails}]},
                {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
            ]});
            if (adventurePopularActivities.length) {
                for await (const [i, val] of adventurePopularActivities.entries()) {
                    newData.push({
                        id: val.id,
                        total_count: val.bookings ? val.bookings.length : 0,
                        activity_category: 'Adventure',
                        title: val.title,
                        state: val.user.state,
                        location: val.user.vendor_business_detail.location,
                        latitude: val.user.vendor_business_detail.latitude,
                        longitude: val.user.vendor_business_detail.longitude,
                        status: val.status,
                        price: val.activity_prices.filter(v => v.rate_type == '3').map(v => {
                            return {
                                id: v.id,
                                no_of_person: v.no_of_person,
                                amount: v.amount,
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
                    });
                }
            }
        } else if(req.params.activity_category == "Rental"){
            var rentalPopularActivities = await RentalActivities.findAll({where: { is_approved: '1', status: '1' }, include:[
                {model: Bookings, where: { activity_share_type: '2' }, required: true},
                {model: Users, include: [{model: vendorBusinessDetails}]},
                {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            ]});
            if (rentalPopularActivities.length) {
                for await (const [i, val] of rentalPopularActivities.entries()) {
                    let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                    let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                    newData.push({
                        id: val.id,
                        total_count: val.bookings ? val.bookings.length : 0,
                        activity_category: 'Rental',
                        title: val.title,
                        state: val.user.state,
                        location: val.user.vendor_business_detail.location,
                        latitude: val.user.vendor_business_detail.latitude,
                        longitude: val.user.vendor_business_detail.longitude,
                        status: val.status,
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
                        images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                            return {
                                id: v.id,
                                media_path: v.media_path,
                                status: v.status
                            }
                        }),
                    });
                }
            }
        }
        if (newData.length) {
            newData = newData.sort((a, b) => {
                return b.total_count - a.total_count;
            })
            return res.status(200).json({
                status: 200,
                data: newData.slice(0, 6),
                message: 'Popular activities fetch successfully.',
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
 * @params:      activity_id
 * @purpose:     To get popular activities by activity (sub-category)
*/
controller.getPopularActivitiesByActivity = async (req, res) => {
    try {
        var newData = [];
        if(req.params.activity_category == "Adventure"){
            var adventurePopularActivities = await AdventureActivities.findAll({where: { is_approved: '1', status: '1' }, include:[
                {model: Bookings, where: { activity_share_type: '1' }, required: true},
                {model: Users, include: [{model: vendorBusinessDetails}]},
                {model: ActivityMedia, where: { activity_share_type: '1' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '1' }, required: false}, 
            ]});
            if (adventurePopularActivities.length) {
                for await (const [i, val] of adventurePopularActivities.entries()) {
                    newData.push({
                        id: val.id,
                        total_count: val.bookings ? val.bookings.length : 0,
                        activity_category: 'Adventure',
                        title: val.title,
                        state: val.user.state,
                        location: val.user.vendor_business_detail.location,
                        latitude: val.user.vendor_business_detail.latitude,
                        longitude: val.user.vendor_business_detail.longitude,
                        status: val.status,
                        price: val.activity_prices.filter(v => v.rate_type == '3').map(v => {
                            return {
                                id: v.id,
                                no_of_person: v.no_of_person,
                                amount: v.amount,
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
                    });
                }
            }
        } else if(req.params.activity_category == "Rental"){
            var rentalPopularActivities = await RentalActivities.findAll({where: { is_approved: '1', status: '1' }, include:[
                {model: Bookings, where: { activity_share_type: '2' }, required: true},
                {model: Users, include: [{model: vendorBusinessDetails}]},
                {model: ActivityMedia, where: { activity_share_type: '2' }, required: false},
                {model: ActivityPrices, where: { activity_share_type: '2' }, required: false}, 
            ]});
            if (rentalPopularActivities.length) {
                for await (const [i, val] of rentalPopularActivities.entries()) {
                    let perHourData = val.activity_prices.find(v => v.rate_type == '1');
                    let perDayData = val.activity_prices.find(v => v.rate_type == '2');
                    newData.push({
                        id: val.id,
                        total_count: val.bookings ? val.bookings.length : 0,
                        activity_category: 'Rental',
                        title: val.title,
                        state: val.user.state,
                        location: val.user.vendor_business_detail.location,
                        latitude: val.user.vendor_business_detail.latitude,
                        longitude: val.user.vendor_business_detail.longitude,
                        status: val.status,
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
                        images: val.activity_media?.filter(v => v.media_type == '1').map(v => {
                            return {
                                id: v.id,
                                media_path: v.media_path,
                                status: v.status
                            }
                        }),
                    });
                }
            }
        }
        if (newData.length) {
            newData = newData.sort((a, b) => {
                return b.total_count - a.total_count;
            })
            return res.status(200).json({
                status: 200,
                data: newData.slice(0, 6),
                message: 'Popular activities fetch successfully.',
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
 * @params:      id
 * @purpose:     To get activity detail
*/
controller.getActivityDetail = async (req, res) => {
    try {
        var activityDetail = [];
        var newData = {};
        if(req.params.activity_category == "Adventure"){
            activityDetail = await AdventureActivities.findOne({
                where: { id: req.params.id, is_approved: '1', status: '1' }, 
                include:[
                    {model: Bookings, 
                        attributes: ['id'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review', 'createdAt'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                                include: [{model: Users, attributes: ['first_name', 'last_name', 'image']}]
                            }
                        ],
                        where: { activity_share_type: '1' }, required: false
                    },
                    {model: Users, 
                        attributes: ['country', 'state', 'city', 'image'],
                        include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]
                    },
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
                    {model: ActivityTimeSheets, include: [{model: ActivityAutoTimeSheets}, {model: ActivityFlexdTimeSheets}, {model: ActivityTimeSheetTimes}]},
                    {model: ActivityDaySheets, include: [{model: ActivityDaySheetDays}]},
                    {model: ActivityAdventureListDates}
                ]
            });
            if (activityDetail) {
                let videoData = activityDetail?.activity_media?.find(v => v.media_type == '2');
                var rating = 0;
                activityDetail.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                newData = {
                    id: activityDetail.id,
                    activity_category: 'Adventure',
                    title: activityDetail.title,
                    level: activityDetail.level,
                    altitude_depth_height: activityDetail.altitude_depth_height,
                    age_from: activityDetail.age_from,
                    age_to: activityDetail.age_to,
                    language: activityDetail.language,
                    description: activityDetail.description,
                    warning: activityDetail.warning,
                    activity_type: activityDetail.activity_type,
                    is_pickup: activityDetail.is_pickup,
                    is_website: activityDetail.is_website,
                    website_link: activityDetail.website_link,
                    single_day_categories: activityDetail.single_day_categories,
                    is_provide_all_parts: activityDetail.is_provide_all_parts,
                    is_approved: activityDetail.is_approved,
                    status: activityDetail.status,
                    meeting_point_id: activityDetail?.activity_meeting_point?.id,
                    is_extra_charges: activityDetail?.activity_meeting_point?.is_extra_charges,
                    address_line_one: activityDetail?.activity_meeting_point?.address_line_one,
                    address_line_two: activityDetail?.activity_meeting_point?.address_line_two,
                    landmark: activityDetail?.activity_meeting_point?.landmark,
                    country: activityDetail?.activity_meeting_point?.country,
                    state: activityDetail?.activity_meeting_point?.state,
                    city: activityDetail?.activity_meeting_point?.city,
                    pin_code: activityDetail?.activity_meeting_point?.pin_code,
                    latitude: activityDetail?.activity_meeting_point?.latitude,
                    longitude: activityDetail?.activity_meeting_point?.longitude,
                    location: activityDetail?.activity_meeting_point?.location,
                    user: {
                        country: activityDetail.user.country,
                        state: activityDetail.user.state,
                        city: activityDetail.user.city,
                        image: activityDetail.user.image,
                        vendor_business_detail: {
                            business_name: activityDetail.user.vendor_business_detail.business_name,
                            location: activityDetail.user.vendor_business_detail.location,
                            latitude: activityDetail.user.vendor_business_detail.latitude,
                            longitude: activityDetail.user.vendor_business_detail.longitude,
                        }
                    },
                    activity: {
                        id: activityDetail.activity.id,
                        title: activityDetail.activity.title,
                        image: activityDetail.activity.image,
                        status: activityDetail.activity.status,
                    },
                    activity_adventure_type: {
                        id: activityDetail.activity_adventure_type.id,
                        name: activityDetail.activity_adventure_type.name,
                        status: activityDetail.activity_adventure_type.status
                    },
                    images: activityDetail?.activity_media?.filter(v => v.media_type == '1').map(v => {
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
                    price: activityDetail?.activity_prices?.filter(v => v.rate_type == '3').map(v => {
                        return {
                            id: v.id,
                            no_of_person: v.no_of_person,
                            amount: v.amount,
                            status: v.status
                        }
                    }),
                    what_to_take: activityDetail?.activity_require_accessories?.filter(v => v.accessories_medium == '1').map(v => {
                        return {
                            id: v.id,
                            name: v.name,
                            status: v.status
                        }
                    }),
                    thing_service_included: activityDetail?.activity_require_accessories?.filter(v => v.accessories_medium == '2').map(v => {
                        return {
                            id: v.id,
                            name: v.name,
                            status: v.status
                        }
                    }),
                    add_ons: activityDetail?.activity_add_ons?.map(v => {
                        return {
                            id: v.id,
                            item: v.item_name,
                            price: v.item_price,
                            quantity: v.quantity - v.booking_add_ons.reduce((a, b) => a + b.quantity, 0),
                            status: v.status
                        }
                    }),
                    list_date: activityDetail?.activity_adventure_list_dates?.map(v => {
                        return {
                            id: v.id,
                            start_date: v.start_date,
                            end_date: v.end_date,
                            status: v.status
                        }
                    }),
                    bookings: activityDetail?.bookings,
                    rating: rating / (5 * activityDetail.bookings.length) * 5,
                    reviews: activityDetail.bookings.length
                }
                if(activityDetail?.activity_time_sheets?.length) {
                    if(activityDetail.single_day_categories == '2') {
                        newData.activity_slot_data = {};
                        newData.activity_slot_data.flexd = [];
                        newData.activity_slot_data.slot = [];
                        for (const [i, value] of activityDetail.activity_time_sheets.entries()) {
                            var ATS = value;
                            newData.activity_slot_data.flexd.push({
                                activity_time_sheet_id: ATS.id,
                                slot_type: ATS.slot_type,
                            });
                            newData.activity_slot_data.slot.push(ATS.activity_time_sheet_times?.map(v => {
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
                            }).find(x => true))
                        }
                    } else{
                        let ATS = activityDetail?.activity_time_sheets[0];
                        newData.activity_slot_data = {
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
                if(activityDetail?.activity_day_sheets?.length) {
                    newData.activity_slot_data = [];
                    for (const [i, ADS] of activityDetail.activity_day_sheets.entries()) {
                        newData.activity_slot_data.push({
                            activity_day_sheet_id: ADS.id,
                            duration: ADS.duration,
                            start_date: ADS.start_date,
                            no_of_spot: ADS.no_of_spot,
                            quantity: ADS.quantity,
                            start_time: ADS.start_time,
                            end_time: ADS.end_time,
                            status: ADS.status,
                            itinerary: ADS.activity_day_sheet_days?.map(v => {
                                return {
                                    activity_day_sheet_days_id: v.id,
                                    day: v.day,
                                    itinerary: v.itinerary,
                                    copy_day_sheet_day_id: v.copy_day_sheet_day_id,
                                    status: v.status,
                                }
                            }),
                        })
                    }
                }
            }
        } else if(req.params.activity_category == "Rental"){
            activityDetail = await RentalActivities.findOne({where: { id: req.params.id, is_approved: '1', status: '1' }, include:[
                {model: Bookings, 
                    attributes: ['id'],
                    include: [
                        {model: RatingReviews,
                            attributes: ['booking_id', 'rating', 'review', 'createdAt'],
                            where: { 'booking_id' : {$not: null} },
                            required: true,
                            include: [{model: Users, attributes: ['first_name', 'last_name', 'image']}]
                        }
                    ],
                    where: { activity_share_type: '2' }, required: false
                },
                {model: Users, 
                    attributes: ['country', 'state', 'city'],
                    include: [{model: vendorBusinessDetails,  attributes: ['location', 'latitude', 'longitude']}]},
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
                            where: { activity_share_type: '2', status:{$in:['1','2']} }, required: true
                        }] 
                    }],
                    where: { activity_share_type: '2' }, required: false},
            ]});
            if (activityDetail) {
                var rating = 0;
                activityDetail.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                let videoData = activityDetail?.activity_media?.find(v => v.media_type == '2');
                let perHourData = activityDetail.activity_prices.find(v => v.rate_type == '1');
                let perDayData = activityDetail.activity_prices.find(v => v.rate_type == '2');
                newData = {
                    id: activityDetail.id,
                    activity_category: 'Rental',
                    title: activityDetail.title,
                    quantity: activityDetail.quantity,
                    description: activityDetail.description,
                    warning: activityDetail.warning,
                    status: activityDetail.status,
                    user: {
                        country: activityDetail.user.country,
                        state: activityDetail.user.state,
                        city: activityDetail.user.city,
                        vendor_business_detail: {
                            location: activityDetail.user?.vendor_business_detail.location,
                            latitude: activityDetail.user?.vendor_business_detail.latitude,
                            longitude: activityDetail.user?.vendor_business_detail.longitude,
                        }
                    },
                    activity: {
                        id: activityDetail.activity.id,
                        title: activityDetail.activity.title,
                        image: activityDetail.activity.image,
                        status: activityDetail.activity.status,
                    },
                    brand: {
                        id: activityDetail.brand.id,
                        name: activityDetail.brand.name,
                        status: activityDetail.brand.status,
                    },
                    model: {
                        id: activityDetail.model.id,
                        name: activityDetail.model.name,
                        type: activityDetail.model.type,
                        status: activityDetail.model.status,
                    },
                    vehicle_details: activityDetail.activity_vehicle_details?.map(v => {
                        return {
                            id: v.id,
                            year: v.year,
                            registration_no: v.registration_no,
                            status: v.status
                        }
                    }),
                    images: activityDetail.activity_media?.filter(v => v.media_type == '1').map(v => {
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
                    what_to_take: activityDetail.activity_require_accessories?.filter(v => v.accessories_medium == '1').map(v => {
                        return {
                            id: v.id,
                            name: v.name,
                            status: v.status
                        }
                    }),
                    thing_service_included: activityDetail.activity_require_accessories?.filter(v => v.accessories_medium == '2').map(v => {
                        return {
                            id: v.id,
                            name: v.name,
                            status: v.status
                        }
                    }),
                    add_ons: activityDetail.activity_add_ons?.map(v => {
                        return {
                            id: v.id,
                            item: v.item_name,
                            price: v.item_price,
                            quantity: v.quantity - v.booking_add_ons.reduce((a, b) => a + b.quantity, 0),
                            status: v.status
                        }
                    }),
                    bookings: activityDetail?.bookings,
                    rating: rating / (5 * activityDetail.bookings.length) * 5,
                    reviews: activityDetail.bookings.length
                }
            }
        }
        if (activityDetail) {
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activity detail fetch successfully.',
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
 * @params:      Request
 * @purpose:     To get filter activities
*/
controller.getFilterActivities = async (req, res) => {
    try {
        var newData = [];
        const haversine = `(
            6371 * acos(
                cos(radians(${req.body.latitude}))
                * cos(radians(latitude))
                * cos(radians(longitude) - radians(${req.body.longitude}))
                + sin(radians(${req.body.latitude})) * sin(radians(latitude))
            )
        )`;
        const distance = 50;
        let mainFilter = { is_approved: '1', status: '1' };
        let VBDObj = { model: vendorBusinessDetails };
        if(req.body.latitude && req.body.longitude) {
            VBDObj.where = sequelize.literal(`${haversine} <= ${distance}`)
            VBDObj.order = sequelize.col(sequelize.literal(haversine))
        }
        if(req.body.activity_id) {
            mainFilter.activity_id = req.body.activity_id;
        }
        if(req.body.activity_category == "Adventure"){
            let adventureFilterActivities = await AdventureActivities.findAll({
                attributes: ['id', 'title', 'status'],
                where: mainFilter,
                include: [
                    {model: Bookings, 
                        attributes: ['id'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                            }
                        ],
                        where: { activity_share_type: '1' }, required: false
                    },
                    { model: Users, attributes: ['state'], include: [VBDObj], required: true },
                    { model: ActivityMedia, where: { activity_share_type: '1' }, required: false },
                    { model: ActivityPrices, where: { activity_share_type: '1' }, required: false }, 
                ]
            });
            for await (const [i, val] of adventureFilterActivities.entries()) {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                newData.push({
                    id: val.id,
                    activity_category: 'Adventure',
                    title: val.title,
                    status: val.status,
                    state: val?.user.state,
                    location: val?.user?.vendor_business_detail.location,
                    latitude: val?.user?.vendor_business_detail.latitude,
                    longitude: val?.user?.vendor_business_detail.longitude,
                    price: val?.activity_prices?.filter(v => v.rate_type == '3').map(v => {
                        return {
                            id: v.id,
                            no_of_person: v.no_of_person,
                            amount: v.amount,
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
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            }
        }  else if(req.body.activity_category == "Rental"){
            let rentalFilterActivities = await RentalActivities.findAll({
                attributes: ['id', 'title', 'status'],
                where: mainFilter, 
                include:[
                    {model: Bookings, 
                        attributes: ['id', 'activity_share_type', 'activity_share_fk'],
                        include: [
                            {model: RatingReviews,
                                attributes: ['booking_id', 'rating', 'review'],
                                where: { 'booking_id' : {$not: null} },
                                required: true,
                            }
                        ],
                        where: { activity_share_type: '2' }, required: false
                    },
                    { model: Users, attributes: ['state'], include: [VBDObj], required: true },
                    { model: ActivityMedia, where: { activity_share_type: '2' }, required: false },
                    { model: ActivityPrices, where: { activity_share_type: '2' }, required: false }, 
                ]
            });
            rentalFilterActivities.forEach(val => {
                var rating = 0;
                val.bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                let perHourData = val?.activity_prices?.find(v => v.rate_type == '1');
                let perDayData = val?.activity_prices?.find(v => v.rate_type == '2');
                newData.push({
                    id: val.id,
                    activity_category: 'Rental',
                    title: val.title,
                    status: val.status,
                    state: val?.user.state,
                    location: val?.user?.vendor_business_detail.location,
                    latitude: val?.user?.vendor_business_detail.latitude,
                    longitude: val?.user?.vendor_business_detail.longitude,
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
                    images: val?.activity_media?.filter(v => v.media_type == '1').map(v => {
                        return {
                            id: v.id,
                            media_path: v.media_path,
                            status: v.status
                        }
                    }),
                    rating: rating / (5 * val.bookings.length) * 5,
                    reviews: val.bookings.length
                });
            });
        }
        if (newData.length) {
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Activities filter successfully.',
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
 * @params:      state
 * @purpose:     To get all location
*/
controller.getAllLocation = async (req, res) => {
    await Users.findAll({
            where: { state: req.params.state, role_id: '3', is_approved: '1', status: '1' },
            include:[{
                model: vendorBusinessDetails, 
                attributes: ["exact_location_name"], 
                group: "exact_location_name", 
                required: true,
                include: [{ model: LocationImages }] 
            }]
        }).then(data => {
        if (data.length) {
            var newData = [];
            for (const [i, val] of data.entries()) {
                newData.push({
                    location: val?.vendor_business_detail?.exact_location_name,
                    image: val?.vendor_business_detail?.location_image?.image
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Location fetch successfully.',
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
 * @params:      state
 * @purpose:     To user apply referral for booking
*/
controller.applyReferral = async (req, res) => {
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
        var existReferral = await Referrals.findOne({where: {referral_code: req.body.referral_code} });
        if(existReferral){
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Applied successfully.',
                error: null,
            });
        } else{
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Please enter valid referral code.',
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
 * @params:      state
 * @purpose:     To user new booking
*/
controller.booking = async (req, res) => {
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
        var shareType = req.body.activity_category == 'Adventure' ? '1' : '2';
        const StartDate = req.body.start_date;
        const EndDate = req.body.end_date;
        const StartTime = req.body.start_time;
        const EndTime = req.body.end_time;
        var AddonsQuantityExist = true;
        if(req.body.activity_category == 'Adventure') {
            var QuantityExist = 0;
            req.body.activity_slot_sheet_share_fk = req.body.slot_id;
            if(req.body.activity_type == '1'){
                var QuantityExist = await sequelize.query(`SELECT id, quantity FROM activity_time_sheet_times WHERE id = ${req.body.slot_id} AND quantity > ( SELECT COALESCE(SUM(quantity),0) FROM bookings WHERE bookings.activity_slot_sheet_share_fk = activity_time_sheet_times.id AND activity_share_type = 1 AND CONCAT_WS( ' ', bookings.start_date, bookings.start_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND CONCAT_WS( ' ', bookings.end_date, bookings.end_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND bookings.status IN('1', '2'))`, {type: sequelize.QueryTypes.SELECT});
            } else if(req.body.activity_type == '2'){
                var QuantityExist = await sequelize.query(`SELECT id, quantity FROM activity_day_sheets WHERE id = ${req.body.slot_id} AND quantity > ( SELECT COALESCE(SUM(quantity),0) FROM bookings WHERE bookings.activity_slot_sheet_share_fk = activity_day_sheets.id AND activity_share_type = 1 AND CONCAT_WS( ' ', bookings.start_date, bookings.start_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND CONCAT_WS( ' ', bookings.end_date, bookings.end_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND bookings.status IN('1', '2'))`, {type: sequelize.QueryTypes.SELECT});
            }
            if(req.body?.booking_add_ons?.length){
                var AddonsQuantityExistArray = await sequelize.query(`SELECT id, quantity FROM activity_add_ons WHERE activity_share_fk = ${req.body.activity_id} AND activity_share_type = 1 AND quantity > ( SELECT COALESCE(SUM(booking_add_ons.quantity), 0) FROM booking_add_ons INNER JOIN bookings ON booking_add_ons.booking_id = bookings.id WHERE booking_add_ons.activity_add_on_id = activity_add_ons.id AND CONCAT_WS( ' ', bookings.start_date, bookings.start_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND CONCAT_WS( ' ', bookings.end_date, bookings.end_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND bookings.status IN('1', '2') )`, {type: sequelize.QueryTypes.SELECT});
                if(Array.isArray(req.body?.booking_add_ons)){
                    var bookingAddOnsArray = req.body.booking_add_ons.map(v => JSON.parse(v));
                } else {
                    var bookingAddOnsArray = [JSON.parse(req.body?.booking_add_ons)];
                }
                var AddonsQuantityExistIds = AddonsQuantityExistArray.map(v => v.id);
                var AddonsQuantityExist = !bookingAddOnsArray.some(v => !AddonsQuantityExistIds.includes(parseInt(v.id)));
            }
        } else {
            var QuantityExist = await sequelize.query(`SELECT id, quantity FROM rental_activities WHERE id = ${req.body.activity_id} AND quantity > ( SELECT COALESCE(SUM(quantity),0) FROM bookings WHERE bookings.activity_share_fk = rental_activities.id AND activity_share_type = 2 AND CONCAT_WS( ' ', bookings.start_date, bookings.start_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND CONCAT_WS( ' ', bookings.end_date, bookings.end_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND bookings.status IN('1', '2'))`, {type: sequelize.QueryTypes.SELECT});
            
            if(req.body?.booking_add_ons?.length){
                var AddonsQuantityExistArray = await sequelize.query(`SELECT id, quantity FROM activity_add_ons WHERE activity_share_fk = ${req.body.activity_id} AND activity_share_type = 2 AND quantity > ( SELECT COALESCE(SUM(booking_add_ons.quantity), 0) FROM booking_add_ons INNER JOIN bookings ON booking_add_ons.booking_id = bookings.id WHERE booking_add_ons.activity_add_on_id = activity_add_ons.id AND CONCAT_WS( ' ', bookings.start_date, bookings.start_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND CONCAT_WS( ' ', bookings.end_date, bookings.end_time ) BETWEEN CONCAT_WS(' ', '${StartDate}', '${StartTime}') AND CONCAT_WS(' ', '${EndDate}', '${EndTime}') AND bookings.status IN('1', '2') )`, {type: sequelize.QueryTypes.SELECT});
                if(Array.isArray(req.body?.booking_add_ons)){
                    var bookingAddOnsArray = req.body.booking_add_ons.map(v => JSON.parse(v));
                } else {
                    var bookingAddOnsArray = [JSON.parse(req.body?.booking_add_ons)];
                }
                var AddonsQuantityExistIds = AddonsQuantityExistArray.map(v => v.id);
                var AddonsQuantityExist = !bookingAddOnsArray.some(v => !AddonsQuantityExistIds.includes(parseInt(v.id)));
            }
        }
        if(QuantityExist){
            if(AddonsQuantityExist){
                if(req.body.is_referral_code == '1'){
                    var existReferral = await Referrals.findOne({where: {referral_code: req.body.referral_code} });
                    if(!existReferral){
                        return res.status(200).json({
                            status: 400,
                            data: null,
                            message: 'Please enter valid referrals code.',
                            error: true,
                        });
                    }
                }
                req.body.user_id = req.decoded_data.id;
                req.body.activity_share_type = shareType;
                req.body.activity_share_fk = req.body.activity_id;
                if(req.body.activity_category == 'Adventure') {
                    var levelPoints = await AdventureActivities.findOne({
                        attributes: ['level'],
                        where: {id: req.body.activity_id},
                        include: [
                            {model: Activities, attributes: ['id', 'beginner_level_point', 'intermediate_level_point', 'expert_level_point'], required: true}
                        ]
                    }); 
                } else{
                    var levelPoints = await RentalActivities.findOne({
                        attributes: ['level'],
                        where: {id: req.body.activity_id},
                        include: [
                            {model: Activities, attributes: ['id', 'beginner_level_point', 'intermediate_level_point', 'expert_level_point'], required: true}
                        ]
                    });
                }
                req.body.level_points = levelPoints.level == '1' ? levelPoints.activity.beginner_level_point : levelPoints.level == '2' ? levelPoints.activity.intermediate_level_point : levelPoints.activity.expert_level_point;
                const booking = await Bookings.create(req.body);
                if (booking){
                    if(req.body?.booking_add_ons?.length){
                        if(Array.isArray(req.body?.booking_add_ons)){
                            var addOnsArray = req.body.booking_add_ons.map(v => JSON.parse(v));
                        } else {
                            var addOnsArray = [JSON.parse(req.body?.booking_add_ons)];
                        }
                        var bookingAddOnsData = [];
                        for await (const [i, v] of addOnsArray.entries()) {
                            let addOnsData = {
                                booking_id: booking.id,
                                activity_add_on_id: v.id,
                                quantity: v.quantity,
                            }
                            bookingAddOnsData.push(addOnsData);
                        }
                        await BookingAddOns.bulkCreate(bookingAddOnsData);
                    }
                    if(req.body.is_referral_code == '1'){
                        let BookingReferralData = {
                            user_id: req.decoded_data.id,
                            booking_id: booking.id,
                            hotel_id: existReferral.user_id,
                            referral_code: req.body.referral_code 
                        }
                        await BookingReferrals.create(BookingReferralData);
                    } else{
                        var activeBookingReferral =  await BookingReferrals.findOne({where: {user_id: req.decoded_data.id, status: '1', createdAt: {$gte : moment().subtract(4, 'days')}}, order: [['id', 'DESC']] });
                        if(activeBookingReferral){
                            let BookingReferralData = {
                                user_id: req.decoded_data.id,
                                booking_id: booking.id,
                                hotel_id: activeBookingReferral.hotel_id,
                                referral_code: activeBookingReferral.referral_code
                            }
                            await BookingReferrals.create(BookingReferralData);
                        }
                    }
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
                    return res.status(200).json({
                        status: 200,
                        data: {
                            id: booking.id,
                            total_price: booking.total_price,
                            razorpay_customer: {
                                customer_id: isRazorpayCustomer ? isRazorpayCustomer.customer_id : customerResponse.id,
                                entity: isRazorpayCustomer ? isRazorpayCustomer.entity : customerResponse.entity,
                                name: isRazorpayCustomer ? isRazorpayCustomer.name : customerResponse.name,
                                email: isRazorpayCustomer ? isRazorpayCustomer.email : customerResponse.email,
                                created_at : isRazorpayCustomer ? isRazorpayCustomer.created_at : customerResponse.created_at,
                            },
                        },
                        message: 'Go to payment process.',
                        error: null,
                    });
                }
            } else{
                return res.status(200).json({
                    status: 400,
                    data: null,
                    message: 'Addons not available.',
                    error: true,
                });
            }
        } else{
            return res.status(200).json({
                status: 400,
                data: null,
                message: 'Booking not available.',
                error: true,
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      state
 * @purpose:     To user booking payment
*/
controller.bookingPayment = async (req, res) => {
    try{
        const totalPrice = await Bookings.findOne({ where: { id: req.body.booking_id, user_id: req.decoded_data.id, status: '1' }}).then(val => val.total_price);
        if(totalPrice){
            var instance = new Razorpay({ key_id: config.RazorpayKeyId, key_secret: config.RazorpaySecret });
            const response = await instance.payments.capture(req.body.payment_id, totalPrice*100, "INR");
            if(response.status == "captured"){
                let bookingPaymentData = {booking_id: req.body.booking_id, total_price: totalPrice, currency: "INR"}
                const bookingPayment = await BookingPayments.create(bookingPaymentData);
                let transactionData = {
                    booking_payment_id: bookingPayment.id,
                    transaction_payment_ref: response.id,
                    entity: response.entity,
                    amount: response.amount/100,
                    currency: response.currency,
                    status: response.status,
                    method: response.method,
                    json_response: response,
                    created_at: response.created_at,
                }
                await Transactions.create(transactionData);
                await Bookings.update({status: '2'}, {where: {id: req.body.booking_id}});
                return res.status(200).json({
                    status: 200,
                    data: [],
                    message: 'Booking successfully.',
                    error: null,
                });
            } else{
                return res.status(400).json({
                    status: 400,
                    data: null,
                    message: 'Transaction failed.',
                    error: true,
                });
            }
        } else{
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Booking not found.',
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
 * @params:      state
 * @purpose:     To get user all bookings
*/
controller.getAllBookings = async (req, res) => {
    try {
        var adventureBookingActivities = await Bookings.findAll({
            attributes: ['id', 'status', 'total_price', 'createdAt'],
            where: { user_id: req.decoded_data.id, activity_share_type: '1', status: {$not: '3'} },
            include:[
                {model: AdventureActivities, where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : null }, required: false,
                    include: [
                        { model: Users,
                            attributes: ['id'], 
                            include: [{
                                model: vendorBusinessDetails,
                                attributes: ['location', 'latitude', 'longitude']
                            }] 
                        },
                        { model: ActivityMedia, where: { activity_share_type: '1', media_type: '1' }, required: false },
                    ]
                },
                {model: AdventureActivityHistories, where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : {$not: null} }, required: false,
                    include: [
                        { model: Users, 
                            attributes: ['id'],
                            include: [{
                                model: vendorBusinessDetails,
                                attributes: ['location', 'latitude', 'longitude']
                            }] 
                        },
                        { model: ActivityMediaHistories, where: { activity_share_type: '1', media_type: '1' }, required: false },
                    ]
                }
            ]
        });
        var rentalBookingActivities = await Bookings.findAll({
            attributes: ['id', 'status', 'total_price', 'createdAt'],
            where: { user_id: req.decoded_data.id, activity_share_type: '2', status: {$not: '3'} },
            include:[
                {model: RentalActivities, where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : null }, required: false,
                    include: [
                        { model: Users, 
                            attributes: ['id'],
                            include: [{
                                model: vendorBusinessDetails,
                                attributes: ['location', 'latitude', 'longitude']
                            }] 
                        },
                        { model: ActivityMedia, where: { activity_share_type: '2',  media_type: '1' }, required: false },
                    ]
                },
                {model: RentalActivityHistories, where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : {$not: null} }, required: false,
                    include: [
                        { model: Users, 
                            attributes: ['id'],
                            include: [{
                                model: vendorBusinessDetails,
                                attributes: ['location', 'latitude', 'longitude']
                            }] 
                        },
                        { model: ActivityMediaHistories, where: { activity_share_type: '2',  media_type: '1' }, required: false },
                    ]
                },
            ]
        });
        if (adventureBookingActivities.length || rentalBookingActivities.length) {
            var newData = [];
            for await (const [index, val] of adventureBookingActivities.entries()) {
                let mp = val.adventure_activity_history?.activity_media_histories || val.adventure_activity?.activity_media;
                newData.push({
                    id: val.id,
                    activity_category: 'Adventure',
                    title: val?.adventure_activity_history?.title || val?.adventure_activity?.title,
                    location: val.adventure_activity_history?.user?.vendor_business_detail.location || val?.adventure_activity?.user?.vendor_business_detail.location,
                    latitude: val.adventure_activity_history?.user?.vendor_business_detail.latitude || val?.adventure_activity?.user?.vendor_business_detail.latitude,
                    longitude: val.adventure_activity_history?.user?.vendor_business_detail.longitude || val?.adventure_activity?.user?.vendor_business_detail.longitude,
                    status: val.status,
                    total_price: val.total_price,
                    createdAt: val.createdAt,
                    images: mp?.map(v => { 
                        return { media_path: v.media_path }
                    }),
                });
            }
            for await (const [index, val] of rentalBookingActivities.entries()) {
                let mp = val.rental_activity_history?.activity_media_histories || val.rental_activity?.activity_media;
                newData.push({
                    id: val.id,
                    activity_category: 'Rental',
                    title: val.rental_activity_history?.title || val.rental_activity?.title,
                    location: val.rental_activity_history?.user?.vendor_business_detail.location || val.rental_activity?.user?.vendor_business_detail.location,
                    latitude: val.rental_activity_history?.user?.vendor_business_detail.latitude || val.rental_activity?.user?.vendor_business_detail.latitude,
                    longitude: val.rental_activity_history?.user?.vendor_business_detail.longitude || val.rental_activity?.user?.vendor_business_detail.longitude,
                    status: val.status,
                    total_price: val.total_price,
                    createdAt: val.createdAt,
                    images: mp?.map(v => { 
                        return { media_path: v.media_path }
                    }),
                });
            }
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
 * @params:      state
 * @purpose:     To get user booking detail
*/
controller.getBookingDetail = async (req, res) => {
    try {
        var bookingDetail = {};
        if(req.params.activity_category == "Adventure"){
            var bookingDetail = await Bookings.findOne({
                attributes: ['id', 'activity_share_type', 'activity_share_fk', 'quantity', 'price_type', 'price', 'total_price', 'start_date', 'end_date', 'start_time', 'end_time', 'is_pickup', 'activity_slot_sheet_share_fk', 'status', 'is_referral_code', 'level_points', 'createdAt'],
                where: {user_id: req.decoded_data.id, id: req.params.id, activity_share_type: '1', status: {$not: '3'}},
                include:[
                    {model: RazorpayCustomer, attributes: ['customer_id', 'entity', 'name', 'email']},
                    {model: BookingReferrals},
                    {model: RatingReviews,
                        attributes: ['rating', 'review', 'createdAt'],
                        where: { 'booking_id' : {$not: null} },
                        include: [{model: Users, attributes: ['first_name', 'last_name', 'image']}],
                        required: false,
                    },
                    {model: BookingAddOns, attributes: ['id', 'quantity'], include: [{model: ActivityAddOns}]},
                    {model: BookingPayments},
                    {model: AdventureActivities, 
                        where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : null }, required: false,
                        include: [
                            {model: Users, 
                                attributes: ['country', 'state', 'city', 'image'],
                                include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]},
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
                                        where: { activity_share_type: '1', status:{$in: ['1','2']} }, required: true
                                    }] 
                                }], 
                                where: { activity_share_type: '1' }, required: false
                            },
                            {model: ActivityMeetingPoints},
                            {model: ActivityAdventureListDates},
                        ]
                    },
                    {model: AdventureActivityHistories, 
                        where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : {$not: null} }, required: false,
                        include: [
                            {model: Users, 
                                attributes: ['country', 'state', 'city', 'image'],
                                include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]},
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
                ]
            });
            if(bookingDetail){
                let videoData = bookingDetail?.adventure_activity_history?.activity_media_histories?.find(v => v.media_type == '2') || bookingDetail?.adventure_activity?.activity_media?.find(v => v.media_type == '2');
                let perPersonPrice = bookingDetail.adventure_activity_history?.activity_price_histories?.filter(v => v.rate_type == '3') || bookingDetail.adventure_activity?.activity_prices?.filter(v => v.rate_type == '3');
                let activityMedia = bookingDetail.adventure_activity_history?.activity_media_histories || bookingDetail.adventure_activity?.activity_media;
                let activityRequireAccessories = bookingDetail.adventure_activity_history?.activity_require_accessory_histories || bookingDetail.adventure_activity?.activity_require_accessories;
                let activityAddOns = bookingDetail.adventure_activity_history?.activity_add_on_histories || bookingDetail.adventure_activity?.activity_add_ons;
                let listDate = bookingDetail.adventure_activity_history?.activity_adventure_list_date_histories || bookingDetail.adventure_activity?.activity_adventure_list_dates;
                let BDAA = bookingDetail.adventure_activity_history || bookingDetail.adventure_activity;
                BDAA.activity_meeting_point = BDAA.activity_meeting_point_history || BDAA.activity_meeting_point;
                var newData = {
                    id: bookingDetail.id,
                    activity_category: 'Adventure',
                    activity_id: bookingDetail.activity_share_fk,
                    quantity: bookingDetail.quantity,
                    price_type: bookingDetail.price_type,
                    price: bookingDetail.price,
                    total_price: bookingDetail.total_price,
                    start_date: bookingDetail.start_date,
                    end_date: bookingDetail.end_date,
                    start_time: bookingDetail.start_time,
                    end_time: bookingDetail.end_time,
                    is_pickup: bookingDetail.is_pickup,
                    slot_id: bookingDetail.activity_slot_sheet_share_fk,
                    status: bookingDetail.status,
                    is_referral_code: bookingDetail.is_referral_code,
                    level_points: bookingDetail.level_points,
                    createdAt: bookingDetail.createdAt,
                    booking_add_ons: bookingDetail.booking_add_ons?.map(v => {
                        return {
                            id: v.id,
                            quantity: v.quantity,
                            activity_add_on: v?.activity_add_on,
                        }
                    }),
                    booking_payment: bookingDetail.booking_payment,
                    razorpay_customer: bookingDetail?.razorpay_customer,
                    booking_referral: bookingDetail?.booking_referral,
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
                        user: BDAA.user ? {
                            country: BDAA.user.country,
                            state: BDAA.user.state,
                            city: BDAA.user.city,
                            image: BDAA.user.image,
                            vendor_business_detail: BDAA.user.vendor_business_detail ? {
                                business_name: BDAA.user.vendor_business_detail.business_name,
                                location: BDAA.user.vendor_business_detail.location,
                                latitude: BDAA.user.vendor_business_detail.latitude,
                                longitude: BDAA.user.vendor_business_detail.longitude,
                            } : null
                        } : null,
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
                        price: perPersonPrice?.map(v => {
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
                        list_date: listDate?.map(v => {
                            return {
                                id: v.id,
                                start_date: v.start_date,
                                end_date: v.end_date,
                                status: v.status
                            }
                        }),
                    },
                    rating_review: bookingDetail?.rating_review
                }
            }
        } else if(req.params.activity_category == "Rental"){
            var bookingDetail = await Bookings.findOne({
                attributes: ['id', 'activity_share_type', 'activity_share_fk', 'quantity', 'price_type', 'price', 'total_price', 'start_date', 'end_date', 'start_time', 'end_time', 'is_pickup', 'activity_slot_sheet_share_fk', 'status', 'is_referral_code', 'level_points', 'createdAt'],
                where: {user_id: req.decoded_data.id, id: req.params.id, activity_share_type: '2'},
                include:[
                    {model: RazorpayCustomer, attributes: ['customer_id', 'entity', 'name', 'email']},
                    {model: BookingReferrals},
                    {model: RatingReviews,
                        attributes: ['booking_id', 'rating', 'review', 'createdAt'],
                        where: { 'booking_id' : {$not: null} },
                        include: [{model: Users, attributes: ['first_name', 'last_name', 'image']}],
                        required: false,
                    },
                    {model: BookingAddOns, attributes: ['id', 'quantity'], include: [{model: ActivityAddOns}]},
                    {model: BookingPayments},
                    {model: RentalActivities, 
                        where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : null }, required: false,
                        include: [
                            {model: Users, 
                                attributes: ['country', 'state', 'city', 'image'],
                                include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]},
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
                        ]
                    },
                    {model: RentalActivityHistories, 
                        where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : {$not: null} }, required: false,
                        include: [
                            {model: Users, 
                                attributes: ['country', 'state', 'city', 'image'],
                                include: [{model: vendorBusinessDetails, attributes: ['business_name', 'location', 'latitude', 'longitude']}]},
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
                        ]
                    },
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
                    activity_id: bookingDetail.activity_share_fk,
                    quantity: bookingDetail.quantity,
                    price_type: bookingDetail.price_type,
                    price: bookingDetail.price,
                    total_price: bookingDetail.total_price,
                    start_date: bookingDetail.start_date,
                    end_date: bookingDetail.end_date,
                    start_time: bookingDetail.start_time,
                    end_time: bookingDetail.end_time,
                    is_pickup: bookingDetail.is_pickup,
                    slot_id: bookingDetail.activity_slot_sheet_share_fk,
                    status: bookingDetail.status,
                    is_referral_code: bookingDetail.is_referral_code,
                    level_points: bookingDetail.level_points,
                    createdAt: bookingDetail.createdAt,
                    booking_add_ons: bookingDetail.booking_add_ons?.map(v => {
                        return {
                            id: v.id,
                            quantity: v.quantity,
                            activity_add_on: v?.activity_add_on,
                        }
                    }),
                    booking_payment: bookingDetail?.booking_payment,
                    razorpay_customer: bookingDetail?.razorpay_customer,
                    booking_referral: bookingDetail?.booking_referral,
                    rental_activity: {
                        id: bookingDetail.rental_activity_history?.id || bookingDetail.rental_activity?.id,
                        title: bookingDetail.rental_activity_history?.title || bookingDetail.rental_activity?.title,
                        quantity: bookingDetail.rental_activity_history?.quantity || bookingDetail.rental_activity?.quantity,
                        description: bookingDetail.rental_activity_history?.description || bookingDetail.rental_activity?.description,
                        warning: bookingDetail.rental_activity_history?.warning || bookingDetail.rental_activity?.warning,
                        is_approved: bookingDetail.rental_activity_history?.is_approved || bookingDetail.rental_activity?.is_approved,
                        status: bookingDetail.rental_activity_history?.status ||bookingDetail.rental_activity?.status,
                        user: {
                            country: bookingDetail.rental_activity_history?.user.country || bookingDetail.rental_activity?.user.country,
                            state: bookingDetail.rental_activity_history?.user.state || bookingDetail.rental_activity?.user.state,
                            city: bookingDetail.rental_activity_history?.user.city || bookingDetail.rental_activity?.user.city,
                            image: bookingDetail.rental_activity_history?.user.image || bookingDetail.rental_activity?.user.image,
                            vendor_business_detail: {
                                business_name: bookingDetail.rental_activity_history?.user?.vendor_business_detail.business_name || bookingDetail.rental_activity?.user?.vendor_business_detail.business_name,
                                location: bookingDetail.rental_activity_history?.user?.vendor_business_detail.location || bookingDetail.rental_activity?.user?.vendor_business_detail.location,
                                latitude: bookingDetail.rental_activity_history?.user?.vendor_business_detail.latitude || bookingDetail.rental_activity?.user?.vendor_business_detail.latitude,
                                longitude: bookingDetail.rental_activity_history?.user?.vendor_business_detail.longitude || bookingDetail.rental_activity?.user?.vendor_business_detail.longitude,
                            }
                        },
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
                    rating_review: bookingDetail?.rating_review
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
 * @params:      id
 * @purpose:     To cancel user booking
*/
controller.bookingCancel = async (req, res) => {
    try {
        await Bookings.update({status: '5'}, {where: {id: req.params.id, user_id: req.decoded_data.id, status: {$in:['1','2']} }});
        let bookingPaymentData = await BookingPayments.findOne({
            where: {booking_id: req.params.id},
            include:[{model: Transactions, required: true}]
        });
        var instance = new Razorpay({ key_id: config.RazorpayKeyId, key_secret: config.RazorpaySecret });
        const response = instance.payments.refund(bookingPaymentData?.transaction?.transaction_payment_ref,{
            "amount": bookingPaymentData?.total_price,
            "speed": "normal"
        });
        if(response.status == "processed"){
            let transactionData = {
                booking_payment_id: bookingPaymentData.id,
                transaction_payment_ref: response.payment_id,
                transaction_refund_ref: response.id,
                entity: response.entity,
                amount: response.amount/100,
                currency: response.currency,
                status: response.status,
                json_response: response,
                created_at: response.created_at,
            }
            await BookingRefunds.create({booking_payment_id: bookingPaymentData.id, transaction_id: response.id, total_price: response.amount/100, currency: response.currency});
            await Transactions.create(transactionData);
        }
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Booking cancelled successfully.',
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
 * @params:      Request
 * @purpose:     To get filter taxi
*/
controller.getFilterTaxi = async (req, res) => {
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
        var dLat = (req.body.drop_latitude-req.body.pickup_latitude) * Math.PI/180;
        var dLon = (req.body.drop_longitude-req.body.pickup_longitude) * Math.PI/180; 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(req.body.pickup_latitude * Math.PI/180) * Math.cos(req.body.drop_latitude * Math.PI/180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = 6371 * c;
        var newData = [];
        const haversine = `(
            6371 * acos(
                cos(radians(${req.body.pickup_latitude}))
                * cos(radians(latitude))
                * cos(radians(longitude) - radians(${req.body.pickup_longitude}))
                + sin(radians(${req.body.pickup_latitude})) * sin(radians(latitude))
            )
        )`;
        const distance = 10;
        let TDBDObj = {model: TaxiDriverBusinessDetails,
            attributes: ['id', 'registration_no', 'location', 'latitude', 'longitude', 'license_no', 'license_expiry_date'],
            include: [
                {model: Brands}, 
                {model: Models},
            ], required: true
        };
        TDBDObj.where = sequelize.literal(`${haversine} <= ${distance} AND driving_area_radius >= ${d}`)
        TDBDObj.order = sequelize.col(sequelize.literal(haversine))
        var roleId = await Role.getIdByRoleName('Taxi Driver');
        var taxiDriver = await Users.findAll({
            attributes: ['id', 'first_name', 'last_name', 'image'],
            where: { role_id: roleId, is_approved: '1', status: '1' },
            include: [
                TDBDObj,
                {model: TaxiBookings,
                    where: {
                        $or: [
                            sequelize.where(sequelize.fn('date', sequelize.col('start_date_time')), "!=", moment(req.body.start_date_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')),
                            { status: {$notIn: ['1','2']} }
                        ]
                    },
                    include: [
                        {model: RatingReviews,
                            attributes: ['rating', 'review'],
                            where: { 'taxi_booking_id' : {$not: null} },
                            required: true,
                        }
                    ], 
                    required: false
                },
            ]
        });
        if (taxiDriver?.length) {
            for await (const [i, val] of taxiDriver.entries()) {
                var rating = 0;
                val.taxi_bookings.map(v => {
                    rating += parseInt(v.rating_review.rating)
                })
                let taxiRateList = await TaxiRateLists.findOne({where: {type: val?.taxi_driver_business_detail?.model.type}});
                taxiRateList.dataValues.total_km = d.toFixed(2);
                taxiRateList.dataValues.total_km_charge = (d * taxiRateList.per_km_charge).toFixed(2);
                newData.push({
                    id: val.id,
                    first_name: val.first_name,
                    last_name: val.last_name,
                    image: val.image,
                    taxi_driver_business_detail: {
                        id: val.taxi_driver_business_detail?.id,
                        registration_no: val.taxi_driver_business_detail?.registration_no,
                        location: val.taxi_driver_business_detail?.location,
                        latitude: val.taxi_driver_business_detail?.latitude,
                        longitude: val.taxi_driver_business_detail?.longitude,
                        license_no: val.taxi_driver_business_detail?.license_no,
                        license_expiry_date: val.taxi_driver_business_detail?.license_expiry_date
                    },
                    brand: val.taxi_driver_business_detail?.brand,
                    model: val.taxi_driver_business_detail?.model,
                    taxi_rate_list: taxiRateList,
                    rating: rating / (5 * val.taxi_bookings.length) * 5,
                    reviews: val.taxi_bookings.length
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Taxi filter successfully.',
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
 * @params:      id
 * @purpose:     To get taxi detail
*/
controller.getTaxiDetail = async (req, res) => {
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
        var data = await Users.findOne({
            where: {id: req.params.id, role_id: roleId, is_approved: '1', status: '1' },
            include: [
                {model: TaxiDriverBusinessDetails, 
                    include: [
                        {model: Brands}, 
                        {model: Models}
                    ], required: true,
                },
                {model: TaxiBookings,
                    attributes: ['id'],
                    include: [
                        {model: RatingReviews,
                            attributes: ['rating', 'review', 'createdAt'],
                            where: { 'taxi_booking_id' : {$not: null} },
                            required: true,
                            include: [{model: Users, attributes: ['first_name', 'last_name', 'image']}]
                        }
                    ],
                    required: false
                },
            ]
        });
        if(data){
            var rating = 0;
            data.taxi_bookings.map(v => {
                rating += parseInt(v.rating_review.rating)
            })
            let taxiRateList = await TaxiRateLists.findOne({where: {type: data.taxi_driver_business_detail?.model.type}});
            let totalKM = parseFloat(req.body.total_km);
            taxiRateList.dataValues.total_km = totalKM.toFixed(2);
            taxiRateList.dataValues.total_km_charge = (totalKM * taxiRateList.per_km_charge).toFixed(2);
            var newData = {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                country_iso: data.country_iso,
                country_code: data.country_code,
                mobile_no: data.mobile_no,
                gender: data.gender,
                dob: data.dob,
                country: data.country,
                state: data.state,
                city: data.city,
                address: data.address,
                pin_code: data.pin_code,
                landmark: data.landmark,
                image: data.image,
                taxi_driver_business_detail: {
                    id: data.taxi_driver_business_detail?.id,
                    registration_no: data.taxi_driver_business_detail?.registration_no,
                    location: data.taxi_driver_business_detail?.location,
                    latitude: data.taxi_driver_business_detail?.latitude,
                    longitude: data.taxi_driver_business_detail?.longitude,
                    driving_area_radius: data.taxi_driver_business_detail?.driving_area_radius,
                    license_no: data.taxi_driver_business_detail?.license_no,
                    license_expiry_date: data.taxi_driver_business_detail?.license_expiry_date,
                    license_fornt_image: data.taxi_driver_business_detail?.license_fornt_image,
                    license_back_image: data.taxi_driver_business_detail?.license_back_image
                },
                brand: data.taxi_driver_business_detail?.brand,
                model: data.taxi_driver_business_detail?.model,
                taxi_rate_list: taxiRateList,
                taxi_bookings: data.taxi_bookings,
                rating: rating / (5 * data.taxi_bookings?.length) * 5,
                reviews: data.taxi_bookings?.length
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Taxi detail fetch successfully.',
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
 * @params:      Request
 * @purpose:     To user new taxi booking
*/
controller.taxiBooking = async (req, res) => {
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
        const taxiBooking = await TaxiBookings.create(req.body);
        if (taxiBooking){
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
            return res.status(200).json({
                status: 200,
                data: {
                    id: taxiBooking.id,
                    total_price: taxiBooking.total_price,
                    razorpay_customer: {
                        customer_id: isRazorpayCustomer ? isRazorpayCustomer.customer_id : customerResponse.id,
                        entity: isRazorpayCustomer ? isRazorpayCustomer.entity : customerResponse.entity,
                        name: isRazorpayCustomer ? isRazorpayCustomer.name : customerResponse.name,
                        email: isRazorpayCustomer ? isRazorpayCustomer.email : customerResponse.email,
                        created_at : isRazorpayCustomer ? isRazorpayCustomer.created_at : customerResponse.created_at,
                    },
                },
                message: 'Go to payment process.',
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
 * @purpose:     To user taxi booking payment
*/
controller.taxiBookingPayment = async (req, res) => {
    try{
        const totalPrice = await TaxiBookings.findOne({ where: { id: req.body.taxi_booking_id, user_id: req.decoded_data.id, status: '1' }}).then(val => val.total_price);
        if(totalPrice){
            var instance = new Razorpay({ key_id: config.RazorpayKeyId, key_secret: config.RazorpaySecret });
            const response = await instance.payments.capture(req.body.payment_id, totalPrice*100, "INR");
            if(response.status == "captured"){
                let taxiBookingPaymentData = {taxi_booking_id: req.body.taxi_booking_id, total_price: totalPrice, currency: "INR"}
                const bookingPayment = await BookingPayments.create(taxiBookingPaymentData);
                let transactionData = {
                    booking_payment_id: bookingPayment.id,
                    transaction_payment_ref: response.id,
                    entity: response.entity,
                    amount: response.amount/100,
                    currency: response.currency,
                    status: response.status,
                    method: response.method,
                    json_response: response,
                    created_at: response.created_at,
                }
                await Transactions.create(transactionData);
                await TaxiBookings.update({status: '2'}, {where: {id: req.body.taxi_booking_id}});
                return res.status(200).json({
                    status: 200,
                    data: [],
                    message: 'Booking successfully.',
                    error: null,
                });
            } else{
                return res.status(400).json({
                    status: 400,
                    data: null,
                    message: 'Transaction failed.',
                    error: true,
                });
            }
        } else{
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Booking not found.',
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
 * @params:      id
 * @purpose:     To cancel user taxi booking
*/
controller.taxiBookingCancel = async (req, res) => {
    try {
        await TaxiBookings.update({status: '5'}, {where: {id: req.params.id, user_id: req.decoded_data.id, status: {$in:['1','2']} }});
        let bookingPaymentData = await BookingPayments.findOne({
            where: {taxi_booking_id: req.params.id},
            include:[{model: Transactions, required: true}]
        });
        var instance = new Razorpay({ key_id: config.RazorpayKeyId, key_secret: config.RazorpaySecret });
        const response = instance.payments.refund(bookingPaymentData?.transaction?.transaction_payment_ref,{
            "amount": bookingPaymentData?.total_price,
            "speed": "normal"
        });
        if(response.status == "processed"){
            let transactionData = {
                booking_payment_id: bookingPaymentData.id,
                transaction_payment_ref: response.payment_id,
                transaction_refund_ref: response.id,
                entity: response.entity,
                amount: response.amount/100,
                currency: response.currency,
                status: response.status,
                json_response: response,
                created_at: response.created_at,
            }
            await BookingRefunds.create({booking_payment_id: bookingPaymentData.id, transaction_id: response.id, total_price: response.amount/100, currency: response.currency});
            await Transactions.create(transactionData);
        }
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Booking cancelled successfully.',
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
 * @params:      id
 * @purpose:     To get user all taxi bookings
*/
controller.getAllTaxiBookings = async (req, res) => {
    try {
        var allTaxiBookings = await TaxiBookings.findAll({
            attributes: ['id', 'total_price', 'start_date_time', 'pickup_latitude', 'pickup_longitude', 'drop_latitude', 'drop_longitude', 'pickup_location', 'drop_location', 'status', 'createdAt'],
            where: { user_id: req.decoded_data.id, status: {$not: '3'} },
            include:[
                {model: Users, 
                    attributes: ['id'],
                    include: [
                        {model: TaxiDriverBusinessDetails, 
                            attributes: ['registration_no'],
                            include: [
                                {model: Brands, attributes: ['name']}, 
                                {model: Models, attributes: ['name', 'type']}
                            ], required: true
                        },
                    ], required: true 
                }
            ]
        });
        if (allTaxiBookings.length) {
            var newData = [];
            for await (const [index, val] of allTaxiBookings.entries()) {
                newData.push({
                    id: val.id,
                    total_price: val.total_price,
                    start_date_time: val.start_date_time,
                    pickup_latitude: val.pickup_latitude,
                    pickup_longitude: val.pickup_longitude,
                    drop_latitude: val.drop_latitude,
                    drop_longitude: val.drop_longitude,
                    pickup_location: val.pickup_location,
                    drop_location: val.drop_location,
                    status: val.status,
                    createdAt: val.createdAt,
                    taxi_driver: {
                        registration_no: val.user?.taxi_driver_business_detail?.registration_no,
                    },
                    brand: val.user?.taxi_driver_business_detail?.brand,
                    model: val.user?.taxi_driver_business_detail?.model
                });
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Taxi bookings fetch successfully.',
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
 * @params:      id
 * @purpose:     To get user taxi booking detail
*/
controller.getTaxiBookingDetail = async (req, res) => {
    try {
        var taxiBookingDetail = await TaxiBookings.findOne({
            attributes: ['id', 'price', 'total_price', 'start_date_time', 'pickup_latitude', 'pickup_longitude', 'drop_latitude', 'drop_longitude', 'pickup_location', 'drop_location', 'status', 'createdAt'],
            where: { id: req.params.id, user_id: req.decoded_data.id, status: {$not: '3'} },
            include:[
                {model: Users, 
                    attributes: ['first_name', 'last_name', 'email', 'country_code', 'mobile_no', 'image'],
                    include: [
                        {model: TaxiDriverBusinessDetails, 
                            attributes: ['registration_no', 'license_no'],
                            include: [
                                {model: Brands, attributes: ['name']}, 
                                {model: Models, attributes: ['name', 'type']}
                            ], required: true
                        }
                    ], required: true 
                },
                {model: RatingReviews,
                    attributes: ['rating', 'review', 'createdAt'],
                    where: { 'taxi_booking_id' : {$not: null}},
                    include: [{model: Users, attributes: ['first_name', 'last_name', 'image']}],
                    required: false
                }
            ]
        });
        if (taxiBookingDetail) {
            var newData = {
                id: taxiBookingDetail.id,
                price: taxiBookingDetail.price,
                total_price: taxiBookingDetail.total_price,
                start_date_time: taxiBookingDetail.start_date_time,
                pickup_latitude: taxiBookingDetail.pickup_latitude,
                pickup_longitude: taxiBookingDetail.pickup_longitude,
                drop_latitude: taxiBookingDetail.drop_latitude,
                drop_longitude: taxiBookingDetail.drop_longitude,
                pickup_location: taxiBookingDetail.pickup_location,
                drop_location: taxiBookingDetail.drop_location,
                status: taxiBookingDetail.status,
                createdAt: taxiBookingDetail.createdAt,
                taxi_driver: {
                    first_name: taxiBookingDetail.user?.first_name,
                    last_name: taxiBookingDetail.user?.last_name,
                    email: taxiBookingDetail.user?.email,
                    country_code: taxiBookingDetail.user?.country_code,
                    mobile_no: taxiBookingDetail.user?.mobile_no,
                    image: taxiBookingDetail.user?.image,
                    taxi_driver_business_detail: taxiBookingDetail?.user?.taxi_driver_business_detail ? {
                        registration_no: taxiBookingDetail.user.taxi_driver_business_detail.registration_no,
                        license_no: taxiBookingDetail.user.taxi_driver_business_detail.license_no
                    } : null,
                },
                brand: taxiBookingDetail.user?.taxi_driver_business_detail?.brand,
                model: taxiBookingDetail.user?.taxi_driver_business_detail?.model,
                rating_review: taxiBookingDetail?.rating_review
            }
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Taxi booking detail fetch successfully.',
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
 * @params:      id
 * @purpose:     To add booking rating & reviews
*/
controller.bookingRatingReviews = async (req, res) => {
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
        var isExistBooking = await Bookings.findOne({
            where: { id: req.body.booking_id, user_id: req.decoded_data.id, status: {$not: '3'} }
        });
        if(isExistBooking){
            req.body.user_id = req.decoded_data.id;
            await RatingReviews.create(req.body);
            await Bookings.update({is_skip: '1'}, { where: { id: req.body.booking_id, user_id: req.decoded_data.id, status: '4'} });
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Rating & Review added successfully.',
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
 * @params:      id
 * @purpose:     To add taxi booking rating & reviews
*/
controller.taxiBookingRatingReviews = async (req, res) => {
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
        var isExistTaxiBooking = await TaxiBookings.findOne({
            where: { id: req.body.taxi_booking_id, user_id: req.decoded_data.id, status: {$not: '3'} }
        });
        if(isExistTaxiBooking){
            req.body.user_id = req.decoded_data.id;
            await RatingReviews.create(req.body);
            await TaxiBookings.update({is_skip: '1'}, { where: { id: req.body.taxi_booking_id, user_id: req.decoded_data.id, status: '4'} });
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Rating & Review added successfully.',
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
 * @params:      id
 * @purpose:     To check booking rating & reviews
*/
controller.checkBookingRatingReviews = async (req, res) => {
    try{
        var adventureBookingDetail = await Bookings.findAll({
            attributes: ['id', 'is_skip'],
            where: { activity_share_type: '1', user_id: req.decoded_data.id, status: '4', is_skip: '0' },
            include:[
                {model: AdventureActivities, 
                    attributes: ['title'],
                    where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : null }, 
                    required: false,
                    include: [
                        { model: ActivityMedia, attributes: ['media_path'], where: { activity_share_type: '1', media_type: '1' }, required: false },
                    ]
                },
                {model: AdventureActivityHistories, 
                    attributes: ['title'],
                    where: { '$bookings.activity_share_type$' : '1', '$bookings.activity_history_share_fk$' : {$not: null} }, 
                    required: false,
                    include: [
                        { model: ActivityMediaHistories, attributes: ['media_path'], where: { activity_share_type: '1', media_type: '1' }, required: false },
                    ]
                }
            ]
        });
        var rentalBookingDetail = await Bookings.findAll({
            attributes: ['id', 'is_skip'],
            where: { activity_share_type: '2', user_id: req.decoded_data.id, status: '4', is_skip: '0' },
            include:[
                {model: RentalActivities, attributes: ['title'], where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : null }, required: false,
                    include: [
                        { model: ActivityMedia, attributes: ['media_path'], where: { activity_share_type: '2',  media_type: '1' }, required: false },
                    ]
                },
                {model: RentalActivityHistories, attributes: ['title'], where: { '$bookings.activity_share_type$' : '2', '$bookings.activity_history_share_fk$' : {$not: null} }, required: false,
                    include: [
                        { model: ActivityMediaHistories, attributes: ['media_path'], where: { activity_share_type: '2',  media_type: '1' }, required: false },
                    ]
                },
            ]
        });
        if (adventureBookingDetail.length || rentalBookingDetail.length) {
            var newData = adventureBookingDetail.concat(rentalBookingDetail);
            return res.status(200).json({
                status: 200,
                data: newData,
                message: 'Data fetch successfully.',
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
 * @params:      id
 * @purpose:     To check taxi booking rating & reviews
*/
controller.checkTaxiBookingRatingReviews = async (req, res) => {
    try{
        var taxiBookingDetail = await TaxiBookings.findAll({
            attributes: ['id', 'is_skip'],
            where: { user_id: req.decoded_data.id, status: '4', is_skip: '0' },
            include:[
                {model: Users, 
                    attributes: ['id', 'first_name', 'last_name'],
                    include: [
                        {model: TaxiDriverBusinessDetails, 
                        attributes: ['registration_no']}
                    ], 
                    required: true 
                }
            ]
        });
        if (taxiBookingDetail.length) {
            return res.status(200).json({
                status: 200,
                data: taxiBookingDetail,
                message: 'Data fetch successfully.',
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
 * @params:      id
 * @purpose:     To skip booking rating & reviews
*/
controller.skipBookingRatingReviews = async (req, res) => {
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
        await Bookings.update({is_skip: '1'}, { where: { id: req.body.booking_id, user_id: req.decoded_data.id, status: '4'} });
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Skip successfully!!.',
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
 * @params:      id
 * @purpose:     To skip taxi booking rating & reviews
*/
controller.skipTaxiBookingRatingReviews = async (req, res) => {
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
        await TaxiBookings.update({is_skip: '1'}, { where: { id: req.body.taxi_booking_id, user_id: req.decoded_data.id, status: '4'} });
        return res.status(200).json({
            status: 200,
            data: null,
            message: 'Skip successfully.',
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

module.exports = controller;