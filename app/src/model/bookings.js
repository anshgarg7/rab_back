'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Booking.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    activity_share_type: { 
      type: DataTypes.ENUM('1','2'), 
      allowNull:false
    },
    activity_share_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_history_share_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:true
    },
    quantity: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    price_type: {
      type: DataTypes.ENUM('1','2','3'), 
      allowNull: false
    },
    price: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    total_price: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    is_pickup: {
      type: DataTypes.ENUM('0','1'),
      defaultValue: "0",
      allowNull: false
    },
    activity_slot_sheet_share_fk: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('1','2','3','4','5'),
      defaultValue: "1",
      allowNull: false
    },
    is_skip: { 
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "0",
      allowNull:false
    },
    is_referral_code: { 
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "0",
      allowNull:false
    },
    level_points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'bookings',
  });

  return Booking;

};


