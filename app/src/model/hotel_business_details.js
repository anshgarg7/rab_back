'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class HotelBusinessDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HotelBusinessDetail.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    business_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    aletrnate_country_iso: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    aletrnate_country_code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    aletrnate_mobile_no: {
      type: DataTypes.INTEGER(20),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    gst_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'hotel_business_details',
  });
  return HotelBusinessDetail;
};