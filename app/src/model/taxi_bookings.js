'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxiBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  TaxiBooking.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    driver_id: {
      type: DataTypes.INTEGER(11),
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
    start_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pickup_latitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    pickup_longitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    drop_latitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    drop_longitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    pickup_location: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    drop_location: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('1','2','3','4','5'),
      defaultValue: "1",
      allowNull: false
    },
    is_skip: {
      type: DataTypes.ENUM('0','1'),
      defaultValue: "0",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'taxi_bookings',
  });

  return TaxiBooking;

};


