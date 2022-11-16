'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RazorpayOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RazorpayOrder.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    order_id: { 
      type:DataTypes.STRING(191),
      allowNull:false
    },
    entity: { 
      type:DataTypes.STRING(50), 
      allowNull:false
    },
    amount: { 
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    amount_paid: { 
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    amount_due: { 
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    currency: { 
      type:DataTypes.STRING(10), 
      allowNull:false
    },
    created_at: {
      type:DataTypes.STRING(191), 
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'razorpay_orders',
  });

  return RazorpayOrder;

};


