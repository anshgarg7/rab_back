'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Activity.init({
    category_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    title: { 
      type:DataTypes.STRING(50),
      allowNull:false
    },
    image: { 
      type:DataTypes.STRING(191),
      get() {
        if (this.getDataValue('image')) {
          return config.BASE_URL + 'uploadImages/activity/' + this.getDataValue('image');
        }
      },
    },
    beginner_level_point: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    intermediate_level_point: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    expert_level_point: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activities',
  });

  return Activity;

};