'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Transaction.init({
    booking_payment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    transaction_payment_ref: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    transaction_refund_ref: {
      type: DataTypes.STRING(191),
      allowNull: true
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
    json_response: {
      type: DataTypes.JSON,
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'transactions',
  });

  return Transaction;

};


