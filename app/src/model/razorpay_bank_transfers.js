'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RazorpayBankTransfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RazorpayBankTransfer.init({
    razorpay_account_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    bank_transfer_ref: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    payment_id: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    mode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bank_reference: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    amount: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    virtual_account_id: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'razorpay_bank_transfers',
  });

  return RazorpayBankTransfer;

};


