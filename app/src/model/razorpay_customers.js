'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RazorpayCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RazorpayCustomer.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    customer_id: { 
      type:DataTypes.STRING(191),
      allowNull:false
    },
    entity: { 
      type:DataTypes.STRING(50), 
      allowNull:false
    },
    name: { 
      type:DataTypes.STRING(20), 
      allowNull:false
    },
    email: { 
      type:DataTypes.STRING(50), 
      allowNull:false
    },
    created_at: {
      type:DataTypes.STRING(191), 
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'razorpay_customers',
  });

  return RazorpayCustomer;

};


