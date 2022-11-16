'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxiRateLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaxiRateLists.init({
    type: {
      type: DataTypes.STRING(20),
      allowNull:false,
    },
    per_km_charge: {
      type:DataTypes.DECIMAL(8, 2),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'taxi_rate_lists',
  });

  return TaxiRateLists;

};