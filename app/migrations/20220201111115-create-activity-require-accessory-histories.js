'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_require_accessory_histories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_require_accessory_id: {
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
      accessories_medium: {
        type: Sequelize.ENUM('1','2'), 
        allowNull: false
      },
      name: {
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
    await queryInterface.dropTable('activity_require_accessory_histories');
  }

};