'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_time_sheet_time_histories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_time_sheet_history_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      activity_time_sheet_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      start_time: {
        type: Sequelize.TIME, 
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME, 
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER(11), 
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('0','1'), 
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
    await queryInterface.dropTable('activity_time_sheet_time_histories');
  }
  
};