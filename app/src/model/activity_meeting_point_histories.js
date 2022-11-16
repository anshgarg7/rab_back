'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActivityMeetingPointHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityMeetingPointHistories.init({
    adventure_activity_history_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    adventure_activity_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    is_extra_charges: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false
    },
    address_line_one: {
      type: DataTypes.STRING(191),
      allowNull:false
    },
    address_line_two: {
      type: DataTypes.STRING(191),
      allowNull:true
    },
    landmark: {
      type: DataTypes.STRING(191),
      allowNull:false
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    pin_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_meeting_point_histories',
  });

  return ActivityMeetingPointHistories;
  
};