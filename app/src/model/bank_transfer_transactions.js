'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankTransferTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  BankTransferTransaction.init({
    razorpay_account_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    transaction_payment_ref: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    amount: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    method: {
      type: DataTypes.STRING(20),
      allowNull: false
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
    modelName: 'bank_transfer_transactions',
  });

  return BankTransferTransaction;

};


