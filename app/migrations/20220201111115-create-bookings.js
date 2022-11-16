'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
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
      activity_share_type: {
        type: Sequelize.ENUM('1','2'), 
        allowNull: false
      },
      activity_share_fk: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_history_share_fk: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      price_type: {
        type: Sequelize.ENUM('1','2','3'), 
        allowNull: false
      },
      price: {
        type:Sequelize.DECIMAL(8, 2),
        allowNull:false
      },
      total_price: {
        type:Sequelize.DECIMAL(8, 2), 
        allowNull:false
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      is_pickup: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      activity_slot_sheet_share_fk: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('1','2','3','4','5'), 
        defaultValue: "1",
        allowNull: false
      },
      is_skip: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      is_referral_code: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      level_points: {
        type: Sequelize.INTEGER(11),
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
    await queryInterface.dropTable('bookings');
  }

};