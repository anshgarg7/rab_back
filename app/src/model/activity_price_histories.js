'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityPriceHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityPriceHistories.init({
    activity_share_history_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_price_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_share_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_share_type: { 
      type:DataTypes.ENUM('1','2'), 
      allowNull:false
    },
    rate_type: {
      type: DataTypes.ENUM('1','2','3'), 
      allowNull: false
    },
    no_of_person: {
      type:DataTypes.INTEGER(11), 
      allowNull:true
    },
    vendor_amount: { 
      type:DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00,
      allowNull:false
    },
    admin_amount: { 
      type:DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00,
      allowNull:false
    },
    amount: { 
      type:DataTypes.DECIMAL(8, 2),
      defaultValue: 0.00,
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_price_histories',
  });

  return ActivityPriceHistories;

};


