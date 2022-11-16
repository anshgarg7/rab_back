'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  BookingPayment.init({
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    taxi_booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_price: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'booking_payments',
  });

  return BookingPayment;

};


