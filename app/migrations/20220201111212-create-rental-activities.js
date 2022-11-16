'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rental_activities', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      model_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      level: {
        type: Sequelize.ENUM('1','2','3'), 
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      warning: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      discount: {
        type: Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
        allowNull: false
      },
      is_vendor_discount: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      is_approved: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
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
    await queryInterface.dropTable('rental_activities');
  }
  
};