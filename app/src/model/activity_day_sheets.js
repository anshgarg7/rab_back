'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityDaySheets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityDaySheets.init({
    adventure_activity_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    duration: {
      type: DataTypes.INTEGER(11), 
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    no_of_spot: {
      type: DataTypes.INTEGER(11), 
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11), 
      allowNull: false
    },
    start_time: { 
      type:DataTypes.TIME,
      allowNull:false
    },
    end_time: {
      type: DataTypes.TIME, 
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_day_sheets',
  });

  return ActivityDaySheets;

};