'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_payments', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      booking_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      taxi_booking_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      total_price: {
        type:Sequelize.DECIMAL(8, 2), 
        allowNull:false
      },
      currency: {
        type: Sequelize.STRING(10),
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
    await queryInterface.dropTable('booking_payments');
  }

};