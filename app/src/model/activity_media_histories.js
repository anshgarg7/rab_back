'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class ActivityMediaHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ActivityMediaHistories.init({
    activity_share_history_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_media_id: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_share_fk: { 
      type:DataTypes.INTEGER(11), 
      allowNull:false
    },
    activity_share_type: { 
      type: DataTypes.ENUM('1','2'), 
      allowNull:false
    },
    media_type: {
      type: DataTypes.ENUM('1','2'), 
      allowNull: false
    },
    media_path: { 
      type:DataTypes.STRING(191),
      allowNull:false,
      get() {
        if (this.getDataValue('media_path')) {
          return config.BASE_URL + 'uploadImages/activityMedia/' + this.getDataValue('media_path');
        }
      },
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "1",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'activity_media_histories',
  });

  

  return ActivityMediaHistories;

};


