'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taxi_rate_lists', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      per_km_charge: {
        type:Sequelize.DECIMAL(8, 2), 
        allowNull:false
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
    await queryInterface.dropTable('taxi_rate_lists');
  }
  
};