'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_day_sheet_day_histories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_day_sheet_history_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_day_sheet_day_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_day_sheet_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      day: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      itinerary: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      copy_day_sheet_day_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
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
    await queryInterface.dropTable('activity_day_sheet_day_histories');
  }
  
};