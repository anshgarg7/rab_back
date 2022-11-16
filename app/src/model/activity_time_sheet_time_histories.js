'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityTimeSheetTimeHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityTimeSheetTimeHistories.init({
    activity_time_sheet_history_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:true
    },
    activity_time_sheet_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:true
    },
    start_time: { 
      type:DataTypes.TIME,
      allowNull:false
    },
    end_time: {
      type: DataTypes.TIME, 
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11), 
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_time_sheet_time_histories',
  });

  return ActivityTimeSheetTimeHistories;

};