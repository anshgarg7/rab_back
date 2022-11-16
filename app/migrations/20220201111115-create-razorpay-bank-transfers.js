'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('razorpay_bank_transfers', {
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
      bank_transfer_ref: {
        type: Sequelize.INTEGER(191),
        allowNull: false
      },
      entity: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      payment_id: {
        type: Sequelize.INTEGER(191),
        allowNull: false
      },
      mode: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      bank_reference: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      amount: {
        type:Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
        allowNull:false
      },
      virtual_account_id: {
        type: Sequelize.STRING(191),
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
    await queryInterface.dropTable('razorpay_bank_transfers');
  }

};