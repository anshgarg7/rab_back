'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_vehicle_detail_histories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_vehicle_detail_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_share_history_fk: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_share_fk: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_share_type: {
        type: Sequelize.ENUM('1','2'),
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER(4),
        allowNull: false
      },
      registration_no: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "1",
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
    await queryInterface.dropTable('activity_vehicle_detail_histories');
  }

};