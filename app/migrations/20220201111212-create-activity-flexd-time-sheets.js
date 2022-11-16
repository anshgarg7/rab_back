'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_flexd_time_sheet', {
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
      duration: {
        type: Sequelize.TIME, 
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME, 
        allowNull: false
      },
      day_quantity: {
        type: Sequelize.INTEGER(11), 
        allowNull: false
      },
      duration_quantity: {
        type: Sequelize.INTEGER(11), 
        allowNull: false
      },
      itinerary: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('activity_flexd_time_sheet');
  }
  
};