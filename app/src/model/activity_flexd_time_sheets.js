'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityFlexdTimeSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityFlexdTimeSheet.init({
    activity_time_sheet_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    duration: { 
      type:DataTypes.TIME,
      allowNull:false
    },
    start_time: {
      type: DataTypes.TIME, 
      allowNull: false
    },
    day_quantity: {
      type: DataTypes.INTEGER(11), 
      allowNull: false
    },
    duration_quantity: {
      type: DataTypes.INTEGER(11), 
      allowNull: false
    },
    itinerary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_flexd_time_sheet',
  });

  return ActivityFlexdTimeSheet;

};