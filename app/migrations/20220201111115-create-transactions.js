'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      booking_payment_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      transaction_payment_ref: {
        type: Sequelize.INTEGER(191),
        allowNull: false
      },
      transaction_refund_ref: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      entity: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      amount: {
        type:Sequelize.DECIMAL(8, 2), 
        allowNull:false
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      method: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      json_response: {
        type: Sequelize.JSON,
        allowNull: false
      },
      created_at: {
        type: Sequelize.BIGINT(20),
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
    await queryInterface.dropTable('transactions');
  }

};