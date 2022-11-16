'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class help extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  help.init({
    email: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    message: {
      type: DataTypes.TEXT('long')
    },
  }, {
    sequelize,
    modelName: 'help',
  });
  return help;
};