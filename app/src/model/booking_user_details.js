'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingUserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  BookingUserDetail.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    booking_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    first_name: { 
      type:DataTypes.STRING(50), 
      allowNull:false
    },
    last_name: { 
      type:DataTypes.STRING(50), 
      allowNull:false
    },
    age: {
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'booking_user_details',
  });

  return BookingUserDetail;

};


