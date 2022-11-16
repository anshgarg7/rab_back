'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kyc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kyc.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    identity: {
      type: DataTypes.STRING(191),
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'kyc',
  });
  return kyc;
};