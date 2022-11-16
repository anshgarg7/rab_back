'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RentalActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RentalActivity.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    activity_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    model_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    title: {
      type: DataTypes.STRING(191),
      allowNull:false,
    },
    level: {
      type: DataTypes.ENUM('1', '1', '3'),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    warning: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    discount: { 
      type:DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00,
      allowNull:false
    },
    is_vendor_discount: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "0",
      allowNull: false
    },
    is_approved: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "0",
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'rental_activities',
  });

  return RentalActivity;
  
};