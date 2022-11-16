const {sequelize,DataTypes} = require('../../index');
const Users = require('../../model/users')(sequelize, DataTypes);
const Referrals = require('../../model/referrals')(sequelize, DataTypes);
const Bookings = require('../../model/bookings')(sequelize, DataTypes);
const BookingReferrals = require('../../model/booking_referrals')(sequelize, DataTypes);

BookingReferrals.belongsTo(Users, {
    foreignKey: 'hotel_id'
});

BookingReferrals.belongsTo(Bookings, {
    foreignKey: 'booking_id'
});

const controller = {};

/**
 * @params:      
 * @purpose:     To hotel dashboard
*/
controller.dashboard = async (req, res) => {
    try {
        var data = await Referrals.findOne({attributes: ['referral_code', 'qr_code'], where: { user_id: req.decoded_data.id, status: '1' }});
        var referralsCount = await BookingReferrals.count({ where: { hotel_id: req.decoded_data.id, status: '1' } });
        data.qr_code = data.qr_code.toString('utf8');
        Object.assign(data.dataValues, {referrals_count: referralsCount});
        return res.status(200).json({
            status: 200,
            data: data,
            message: 'Data fetch successfully.',
            error: null,
        });
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
 * @params:      
 * @purpose:     To hotel get referrals listing
*/
controller.getReferrals = async (req, res) => {
    try {
        var data = await BookingReferrals.findAll({
            attributes: ['id', 'referral_code', 'status'],
            where: { hotel_id: req.decoded_data.id, status: '1' },
            include:[
                {model: Users, attributes: ['first_name', 'last_name', 'email'], required: true},
                {model: Bookings, attributes: ['id', 'total_price', 'start_date', 'start_time', 'end_date', 'end_time', 'createdAt'], required: true}
            ]
        });
        if(data.length){
            return res.status(200).json({
                status: 200,
                data: data,
                message: 'Booking referrals fetch successfully.',
                error: null,
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
        })
    }
}

module.exports = controller;