'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VehicleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VehicleModel.init({
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull:false,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull:false,
    },
    status: {
      type: DataTypes.ENUM('0','1','2'),
      defaultValue: "1",
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'models',
  });

  return VehicleModel;
  
};