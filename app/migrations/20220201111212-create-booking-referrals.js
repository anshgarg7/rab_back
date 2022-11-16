'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_referrals', {
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
      booking_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      hotel_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      referral_code: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('0','1','2'), 
        defaultValue: "1",
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
    await queryInterface.dropTable('booking_referrals');
  }
  
};