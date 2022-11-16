'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_auto_time_sheets', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_time_sheet_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME, 
        allowNull: false
      },
      slot_time_duration: {
        type: Sequelize.TIME, 
        allowNull: false
      },
      day_slot: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      time_slot: {
        type: Sequelize.INTEGER(11),
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
    await queryInterface.dropTable('activity_auto_time_sheets');
  }
  
};