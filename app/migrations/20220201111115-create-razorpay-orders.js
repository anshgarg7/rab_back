'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('razorpay_orders', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      order_id: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      entity: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },
      amount_paid: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },
      amount_due: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      created_at: {
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
    await queryInterface.dropTable('razorpay_orders');
  }

};