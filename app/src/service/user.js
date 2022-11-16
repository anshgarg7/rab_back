const {sequelize,DataTypes} = require('../index');
const Users = require('../model/users')(sequelize, DataTypes);
const vendorBusinessDetails = require('../model/vendor_business_details')(sequelize, DataTypes);
const TaxiDriverBusinessDetails = require('../model/taxi_driver_business_details')(sequelize, DataTypes);
const HotelBusinessDetails = require('../model/hotel_business_details')(sequelize, DataTypes);
const UserPermissions = require('../model/user_permissions')(sequelize, DataTypes);
const LocationImages = require('../model/location_images')(sequelize, DataTypes);
const Referrals = require('../model/referrals')(sequelize, DataTypes);
const Categories = require('../model/categories')(sequelize, DataTypes);
const Brands = require('../model/brands')(sequelize, DataTypes);
const Models = require('../model/models')(sequelize, DataTypes);
const TaxiBookings = require('../model/taxi_bookings')(sequelize, DataTypes);
const BookingPayments = require('../model/booking_payments')(sequelize, DataTypes);
const BookingRefunds = require('../model/booking_refunds')(sequelize, DataTypes);
const BookingReferrals = require('../model/booking_referrals')(sequelize, DataTypes);
const Transactions = require('../model/transactions')(sequelize, DataTypes);
const RatingReviews = require('../model/rating_reviews')(sequelize, DataTypes);

Users.hasOne(vendorBusinessDetails, {
    foreignKey: 'user_id'
});

Categories.hasOne(vendorBusinessDetails, {
    foreignKey: 'category_id'
});

vendorBusinessDetails.belongsTo(Categories, {
    foreignKey: 'category_id'
});

Users.hasOne(TaxiDriverBusinessDetails, {
    foreignKey: 'user_id'
});

Brands.hasOne(TaxiDriverBusinessDetails, {
    foreignKey: 'brand_id'
});

TaxiDriverBusinessDetails.belongsTo(Brands, {
    foreignKey: 'brand_id'
});

Models.hasOne(TaxiDriverBusinessDetails, {
    foreignKey: 'model_id'
});

TaxiDriverBusinessDetails.belongsTo(Models, {
    foreignKey: 'model_id'
});

Users.hasOne(HotelBusinessDetails, {
    foreignKey: 'user_id'
});

HotelBusinessDetails.belongsTo(Users, {
    foreignKey: 'user_id'
});

Users.hasOne(Referrals, {
    foreignKey: 'user_id'
});

Referrals.belongsTo(Users, {
    foreignKey: 'user_id'
});

class UserService {

    /**
     * @params:      
     * @purpose: To get admin data
    */
    getAdminData(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: {role_id: '1', status: '1'}
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To add user
    */
    register(body) {
        return new Promise((resolve, reject) => {
            return Users.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    /**
     * @params:      
     * @purpose: To add vendor business detail
    */
    registerVendorBusinessDetail(body) {
        return new Promise((resolve, reject) => {
            return vendorBusinessDetails.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    /**
     * @params:      
     * @purpose: To add vendor location image
    */
     addVendorLocationImage(body) {
        return new Promise((resolve, reject) => {
            return LocationImages.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
    }

    /**
     * @params:      
     * @purpose: To add taxi driver business detail
    */
    registerTaxiDriverBusinessDetail(body) {
        return new Promise((resolve, reject) => {
            return TaxiDriverBusinessDetails.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
    }
    
    /**
     * @params:      
     * @purpose: To get user
    */
    getUserOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }
    
    /**
     * @params:      
     * @purpose: To get vendor
    */
    getVendorOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param,
                include:[{model: vendorBusinessDetails, include: [{model: Categories}] }]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get taxi driver
    */
    getTaxiDriverOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param,
                include:[{model:TaxiDriverBusinessDetails, include: [{model: Brands}, {model: Models}] }]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get Hotel
    */
     getHotelOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param,
                include:[{model: HotelBusinessDetails}, {model: Referrals}]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get all user
    */
    getUserAll(param) {
        return new Promise((resolve, reject) => {
            Users.findAll({
                where: param,
                order: [['id', 'DESC']]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get all vendor
    */
     getVendorAll(param) {
        return new Promise((resolve, reject) => {
            Users.findAll({
                where: param,
                include:[{model: vendorBusinessDetails}],
                order: [['id', 'DESC']]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    getUserSpecAttr(param,attributes) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param,
                attributes:[attributes]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To check user exist
    */
    checkUserExist(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                attributes:['id'],
                where: param
            }).then(user => {
                return resolve(user);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To update user
    */
    update(body, condition) {
        return Users.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    /**
     * @params:      
     * @purpose: To update vendor business detail
    */
    updateVendorBusinessDetail(body, condition) {
        return vendorBusinessDetails.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    /**
     * @params:      
     * @purpose: To update taxi driver business detail
    */
    updateTaxiDriverBusinessDetail(body, condition) {
        return TaxiDriverBusinessDetails.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    /**
     * @params:      
     * @purpose: To delete sub admin
    */
     deleteSubAdmin(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                await UserPermissions.destroy({ where: { user_id: id } });
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To delete user
    */
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To delete vendor
    */
    deleteVendor(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                await vendorBusinessDetails.destroy({ where: { user_id: id } });
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To delete taxi driver
    */
    deleteTaxiDriver(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                await TaxiDriverBusinessDetails.destroy({ where: {user_id: id} });
                var taxiBookingIds = await TaxiBookings.findAll({ where: {driver_id: id} }).then(val => val.map(v => v.id));
                await TaxiBookings.destroy({ where: {driver_id: id} });
                var bookingPaymentsIds = await BookingPayments.findAll({ where: {taxi_booking_id: {$in: taxiBookingIds}} }).then(val => val.map(v => v.id));
                await BookingPayments.destroy({ where: {taxi_booking_id: {$in: taxiBookingIds}} });
                await BookingRefunds.destroy({ where: {booking_payment_id: {$in: bookingPaymentsIds}} });
                await Transactions.destroy({ where: {booking_payment_id: {$in: bookingPaymentsIds}} });
                await RatingReviews.destroy({ where: {taxi_booking_id: {$in: taxiBookingIds}} });
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To delete hotel
    */
    deleteHotel(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                await HotelBusinessDetails.destroy({ where: { user_id: id } });
                await Referrals.destroy({ where: { user_id: id } });
                await BookingReferrals.destroy({ where: { hotel_id: id } });
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }
    
}

module.exports = UserService;