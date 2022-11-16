'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_time_sheet_histories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      adventure_activity_history_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_time_sheet_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      adventure_activity_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      slot_type: {
        type: Sequelize.ENUM('1','2'), 
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
    await queryInterface.dropTable('activity_time_sheet_histories');
  }
  
};