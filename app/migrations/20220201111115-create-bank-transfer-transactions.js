'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_transfer_transactions', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      razorpay_account_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      transaction_payment_ref: {
        type: Sequelize.INTEGER(191),
        allowNull: false
      },
      entity: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      amount: {
        type:Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
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
      customer_id: {
        type: Sequelize.STRING(191),
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
    await queryInterface.dropTable('bank_transfer_transactions');
  }

};