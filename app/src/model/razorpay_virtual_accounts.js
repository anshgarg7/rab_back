'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RazorpayVirtualAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RazorpayVirtualAccount.init({
    razorpay_account_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    virtual_account_payment_ref: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    amount_paid: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    customer_id: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'razorpay_virtual_accounts',
  });

  return RazorpayVirtualAccount;

};


