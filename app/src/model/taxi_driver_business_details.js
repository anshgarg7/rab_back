'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class TaxiDriverBusinessDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaxiDriverBusinessDetail.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    model_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    registration_no: {
      type: DataTypes.STRING(191),
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
    driving_area_radius: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    license_no: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    license_expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    license_fornt_image: {
      type: DataTypes.STRING(191),
      get() {
        if (this.getDataValue('license_fornt_image')) {
          return config.BASE_URL + 'uploadImages/license/' + this.getDataValue('license_fornt_image');
        }
      },
    },
    license_back_image: {
      type: DataTypes.STRING(191),
      get() {
        if (this.getDataValue('license_back_image')) {
          return config.BASE_URL + 'uploadImages/license/' + this.getDataValue('license_back_image');
        }
      },
    },
  }, {
    sequelize,
    modelName: 'taxi_driver_business_details',
  });

  return TaxiDriverBusinessDetail;
  
};