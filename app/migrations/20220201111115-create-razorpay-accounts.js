'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('razorpay_accounts', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      razorpay_customer_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      entity: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      account_id: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      event: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      json_response: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('razorpay_accounts');
  }

};