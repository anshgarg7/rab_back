'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityAdventureListDateHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityAdventureListDateHistories.init({
    adventure_activity_history_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_adventure_list_date_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    adventure_activity_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_adventure_list_date_histories',
  });

  return ActivityAdventureListDateHistories;

};