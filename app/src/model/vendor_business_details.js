'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class VendorBusinessDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VendorBusinessDetail.init({
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
      type: DataTypes.BIGINT(20),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    location_image_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    exact_location_name: {
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
    gst_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    is_visiting_card: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false
    },
    visiting_card_image: {
      type: DataTypes.STRING(191),
      get() {
        if (this.getDataValue('visiting_card_image')) {
          return config.BASE_URL + 'uploadImages/visitingCard/' + this.getDataValue('visiting_card_image');
        }
      },
    },
    award_certification_image: {
      type: DataTypes.STRING(191),
      get() {
        if (this.getDataValue('award_certification_image')) {
          return config.BASE_URL + 'uploadImages/awardCertification/' + this.getDataValue('award_certification_image');
        }
      },
    },
  }, {
    sequelize,
    modelName: 'vendor_business_details',
  });
  return VendorBusinessDetail;
};