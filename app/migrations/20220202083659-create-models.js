'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('models', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull:false,
      },
      name: {
        name: Sequelize.STRING(20),
        allowNull:false,
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('models');
  }
};