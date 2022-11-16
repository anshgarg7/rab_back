'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActivityAutoTimeSheetHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityAutoTimeSheetHistories.init({
    activity_time_sheet_history_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    activity_auto_time_sheet_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    activity_time_sheet_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull:false
    },
    slot_time_duration: {
      type: DataTypes.TIME,
      allowNull:false
    },
    day_slot: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    time_slot: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_auto_time_sheet_histories',
  });

  return ActivityAutoTimeSheetHistories;
  
};