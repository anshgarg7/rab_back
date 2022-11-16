'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityTimeSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityTimeSheet.init({
    adventure_activity_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    slot_type: { 
      type:DataTypes.ENUM('1','2','3','4','5'), 
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'activity_time_sheets',
  });

  return ActivityTimeSheet;

};


