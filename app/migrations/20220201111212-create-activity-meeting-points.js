'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_meeting_points', {
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
      is_extra_charges: {
        type: Sequelize.ENUM('0','1'), 
        allowNull: false
      },
      address_line_one: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      address_line_two: {
        type: Sequelize.STRING(191),
        allowNull: true
      },
      landmark: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      country:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      state:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      city:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      pin_code: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      latitude: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      longitude: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(191),
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
    await queryInterface.dropTable('activity_meeting_points');
  }
  
};