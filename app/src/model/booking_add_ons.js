'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingAddOn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  BookingAddOn.init({
    booking_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_add_on_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    quantity: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'booking_add_ons',
  });

  return BookingAddOn;

};


