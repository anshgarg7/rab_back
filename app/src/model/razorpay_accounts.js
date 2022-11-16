'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RazorpayAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RazorpayAccount.init({
    razorpay_customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    account_id: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    event: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    json_response: {
      type: DataTypes.JSON,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'razorpay_accounts',
  });

  return RazorpayAccount;

};


