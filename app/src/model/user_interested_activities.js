'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInterestedActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserInterestedActivity.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    activity_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'user_interested_activities',
  });

  return UserInterestedActivity;
  
};