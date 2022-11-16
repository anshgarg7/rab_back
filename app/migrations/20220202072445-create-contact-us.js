'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_us', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      first_name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(20)
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        email:true
      },
      message: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      reply_message: {
        type: Sequelize.TEXT('long'),
        defaultValue: null,
        allowNull: true
      },
      is_reply: {
        type: Sequelize.ENUM('0','1'), 
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contact_us');
  }
  
};