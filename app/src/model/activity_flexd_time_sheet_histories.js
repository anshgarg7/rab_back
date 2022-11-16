'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityFlexdTimeSheetHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityFlexdTimeSheetHistories.init({
    activity_time_sheet_history_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_flexd_time_sheet_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
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
    modelName: 'activity_flexd_time_sheet_histories',
  });

  return ActivityFlexdTimeSheetHistories;

};