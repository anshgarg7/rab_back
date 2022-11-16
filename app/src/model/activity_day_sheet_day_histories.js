'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityDaySheetDayHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityDaySheetDayHistories.init({
    activity_day_sheet_history_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_day_sheet_day_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_day_sheet_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    day: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    itinerary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    copy_day_sheet_day_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_day_sheet_day_histories',
  });

  return ActivityDaySheetDayHistories;

};