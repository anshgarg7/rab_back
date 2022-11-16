'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('razorpay_virtual_accounts', {
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
      virtual_account_payment_ref: {
        type: Sequelize.INTEGER(191),
        allowNull: false
      },
      entity: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      amount_paid: {
        type:Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
        allowNull:false
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
    await queryInterface.dropTable('razorpay_virtual_accounts');
  }

};