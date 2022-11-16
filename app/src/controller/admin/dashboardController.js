const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const Categories = require('../../model/categories')(sequelize, DataTypes);
const Activities = require('../../model/activities')(sequelize, DataTypes);
const Models = require('../../model/models')(sequelize, DataTypes);
const Bookings = require('../../model/bookings')(sequelize, DataTypes);
const RentalActivities = require('../../model/rental_activities')(sequelize, DataTypes);
const AdventureActivities = require('../../model/adventure_activities')(sequelize, DataTypes);
const TaxiBookings = require('../../model/taxi_bookings')(sequelize, DataTypes);
const Permissions = require('../../model/permissions')(sequelize, DataTypes);
const Transactions = require('../../model/transactions')(sequelize, DataTypes);

const controller = {};

/**
 * @params:      
 * @purpose:     To view Super Admin / Admin dashboard
*/
controller.dashboard = async (req, res) => {
    try {
        var subAdminCount = await Users.count({ where: { role_id: '2' } });
        var vendorsCount = await Users.count({ where: { role_id: '3' } });
        var usersCount = await Users.count({ where: { role_id: '4' } });
        var taxiDriversCount = await Users.count({ where: { role_id: '5' } });
        var hotelsCount = await Users.count({ where: { role_id: '6' } });
        var visitorDeviceType = await Users.findAll({
            attributes: [
                'device_type',
                [sequelize.fn('count', sequelize.col('device_type')), 'visitor_type_count'],
            ],
            group: ['device_type'],
            raw: true
        });
        for await (let [key, val] of ['Android', 'Ios', 'Web'].entries()) {
            if(!visitorDeviceType.some(v => val == v.device_type)) {
                visitorDeviceType.push({device_type: val, visitor_type_count: 0})
            }
        }
        var activeTaxiDriversCount = await Users.count({ where: { role_id: '5', status: '1' } });
        var closeTaxiDriversCount = await Users.count({ where: { role_id: '5', status: '0' } });
        var approvedTaxiDriversCount = await Users.count({ where: { role_id: '5', is_approved: '1' } });
        var unapprovedTaxiDriversCount = await Users.count({ where: { role_id: '5', is_approved: '0' } });
        var uniqueVisitorCount = await Users.findAll({
            attributes: [
                'gender',
                [sequelize.fn('count', sequelize.col('gender')), 'unique_visitor_count'],
            ],
            group: ['gender'],
            raw: true
        });
        for await (let [key, val] of ['Male', 'Female', 'Other'].entries()) {
            if(!uniqueVisitorCount.some(v => val == v.gender)) {
                uniqueVisitorCount.push({gender: val, unique_visitor_count: 0})
            }
        }
        var categoriesCount = await Categories.count();
        var activitiesCount = await Activities.count();
        var bookingsCount = await Bookings.count();
        var bookingsStatusCount = await Bookings.findAll({
            attributes: [
                'status',
                [sequelize.fn('count', sequelize.col('status')), 'booking_status_count'],
            ],
            group: ['status'],
            raw: true
        });
        for await (let [key, val] of ['1', '2', '3', '4', '5'].entries()) {
            if(!bookingsStatusCount.some(v => val == v.status)) {
                bookingsStatusCount.push({status: val, booking_status_count: 0})
            }
        }
        var payment = await sequelize.query(`SELECT DATE_FORMAT(createdAt, "%b") AS month, SUM(amount) AS payment FROM transactions WHERE transaction_refund_ref IS NULL AND YEAR(createdAt) = YEAR(CURRENT_DATE()) GROUP BY MONTH(createdAt)`, {type: sequelize.QueryTypes.SELECT});
        var finalPayment = [];
        for await (let [key, val] of ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].entries()) {
            if(payment.some(v => val == v.month)) {
                finalPayment.push(payment.find(v => val == v.month).payment)
            } else{
                finalPayment.push(0)
            }
        }
        var refund = await sequelize.query(`SELECT DATE_FORMAT(createdAt, "%b") AS month, SUM(amount) AS refund FROM transactions WHERE transaction_refund_ref IS NOT NULL AND YEAR(createdAt) = YEAR(CURRENT_DATE()) GROUP BY MONTH(createdAt)`, {type: sequelize.QueryTypes.SELECT});
        var finalRefund = [];
        for await (let [key, val] of ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].entries()) {
            if(refund.some(v => val == v.month)) {
                finalRefund.push(refund.find(v => val == v.month).refund)
            } else{
                finalRefund.push(0)
            }
        }
        var rentalActivitiesCount = await RentalActivities.count();
        var activeRentalActivitiesCount = await RentalActivities.count({ where: { status: '1' } });
        var closeRentalActivitiesCount = await RentalActivities.count({ where: { status: '0' } });
        var approvedRentalActivitiesCount = await RentalActivities.count({ where: { is_approved: '1' } });
        var unapprovedRentalActivitiesCount = await RentalActivities.count({ where: { is_approved: '0' } });
        var adventureActivitiesCount = await AdventureActivities.count();
        var activeAdventureActivitiesCount = await AdventureActivities.count({ where: { status: '1' } });
        var closeAdventureActivitiesCount = await AdventureActivities.count({ where: { status: '0' } });
        var approvedAdventureActivitiesCount = await AdventureActivities.count({ where: { is_approved: '1' } });
        var unapprovedAdventureActivitiesCount = await AdventureActivities.count({ where: { is_approved: '0' } });
        var vendorActivitiesCount = rentalActivitiesCount + adventureActivitiesCount;
        var taxiBookingCount = await TaxiBookings.count();
        var taxiBookingsStatusCount = await TaxiBookings.findAll({
            attributes: [
                'status',
                [sequelize.fn('count', sequelize.col('status')), 'taxi_booking_status_count'],
            ],
            group: ['status'],
            raw: true
        });
        for await (let [key, val] of ['1', '2', '3', '4', '5'].entries()) {
            if(!taxiBookingsStatusCount.some(v => val == v.status)) {
                taxiBookingsStatusCount.push({status: val, taxi_booking_status_count: 0})
            }
        }
        return res.render('dashboard', {subAdminCount, vendorsCount, usersCount, taxiDriversCount, activeTaxiDriversCount, closeTaxiDriversCount, approvedTaxiDriversCount, unapprovedTaxiDriversCount, hotelsCount, visitorDeviceType, uniqueVisitorCount, categoriesCount, activitiesCount, bookingsCount, bookingsStatusCount, rentalActivitiesCount, activeRentalActivitiesCount, closeRentalActivitiesCount, approvedRentalActivitiesCount, unapprovedRentalActivitiesCount, adventureActivitiesCount, activeAdventureActivitiesCount, closeAdventureActivitiesCount, approvedAdventureActivitiesCount, unapprovedAdventureActivitiesCount, vendorActivitiesCount, taxiBookingCount, taxiBookingsStatusCount, finalPayment, finalRefund, stackScript: '../partials/script/dashboard', stackLink: '../partials/link/dashboard'});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      id
 * @purpose:     To get model list according to selected brand
*/
controller.getModelList = async (req, res) => {
    Models.findAll({where: {brand_id: req.params.id, status: '1'}}).then(data => {
        return res.send(data);
    }).catch(err => {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      
 * @purpose:     To view profile
*/
controller.profile = async (req, res) => {
    try {
        return res.render('profile', {authUser: req.decoded_data});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      
 * @purpose:     To manage permissions
*/
controller.permissionsIndex = async (req, res) => {
    try {
        var data = await Permissions.findAll().then((val) => {
            let obj = {}
            val.forEach((v) => {
                obj[v.slug] = v.status
            })
            return obj
        });
        return res.render('permissions', {customScript: '../partials/script/permissionsForm', data});
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      Request
 * @purpose:     To create/update permissions
*/
controller.permissionsStore = async (req, res) => {
    try{
        var data = await Permissions.findAll();
        if(data.length){
            for await (let [index, val] of req.body.slug.entries()) {
                let status = req.body.status[val] || '0';
                await Permissions.update({status: status}, {where: {slug: val}});
            }
            req.toastr.success("Permissions updated successfully.");
        } else{
            var finalData = [];
            for await (let [index, val] of req.body.slug.entries()) {
                let status = req.body.status[val] || '0';
                finalData.push({'slug':  val, 'status': status});
            }
            await Permissions.bulkCreate(finalData);
            req.toastr.success("Permissions added successfully.");
        }
        return res.redirect('back');
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

module.exports = controller;