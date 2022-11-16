'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bank_details.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    account_holder_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    account_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ifsc_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'bank_details',
  });
  return bank_details;
};