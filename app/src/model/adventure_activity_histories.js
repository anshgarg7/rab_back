'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AdventureActivityHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdventureActivityHistories.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    activity_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    adventure_activity_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    activity_adventure_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    title: {
      type: DataTypes.STRING(191),
      allowNull:false
    },
    level: {
      type: DataTypes.ENUM('1', '1', '3'),
      allowNull: false
    },
    altitude_depth_height: { 
      type:DataTypes.DECIMAL(10, 3),
      allowNull:false
    },
    age_from: {
      type: DataTypes.INTEGER(2),
      allowNull:false
    },
    age_to: {
      type: DataTypes.INTEGER(2),
      allowNull:false
    },
    language: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    warning: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_pickup: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false
    },
    activity_type: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false
    },
    single_day_categories: {
      type: DataTypes.ENUM('1', '2', '3'),
      allowNull: true
    },
    is_provide_all_parts: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false
    },
    is_website: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false
    },
    website_link: {
      type: DataTypes.STRING(191),
      allowNull:true
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
    modelName: 'adventure_activity_histories',
  });

  return AdventureActivityHistories;
  
};