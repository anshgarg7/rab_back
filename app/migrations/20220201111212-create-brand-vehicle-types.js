'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('brand_vehicle_types', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_id: {
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
    await queryInterface.dropTable('brand_vehicle_types');
  }
  
};