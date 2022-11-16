'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Referral.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    sr_no: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    referral_code: {
      type: DataTypes.STRING(191),
      allowNull:false,
    },
    qr_code: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'referrals',
  });

  return Referral;
  
};