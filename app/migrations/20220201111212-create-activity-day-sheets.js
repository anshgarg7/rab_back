'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_day_sheets', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      adventure_activity_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER(11), 
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      no_of_spot: {
        type: Sequelize.INTEGER(11), 
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER(11), 
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
    await queryInterface.dropTable('activity_day_sheets');
  }
  
};