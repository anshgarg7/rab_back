'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityAddOns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityAddOns.init({
    activity_share_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_share_type: { 
      type:DataTypes.ENUM('1','2'), 
      allowNull:false
    },
    item_name: {
      type: DataTypes.STRING(191), 
      allowNull: false
    },
    item_price: { 
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
    quantity: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_add_ons',
  });

  

  return ActivityAddOns;

};


