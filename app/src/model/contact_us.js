'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactUs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContactUs.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      email: true
    },
    mobile_no: {
      type: DataTypes.INTEGER(20),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    reply_message: {
      type: DataTypes.TEXT('long'),
      defaultValue: null,
      allowNull: true
    },
    is_reply: {
      type: DataTypes.ENUM('0','1'),
      defaultValue: "0",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'contact_us',
  });

  return ContactUs;

};