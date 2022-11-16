'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adventure_activity_histories', {
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
      adventure_activity_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      activity_adventure_type_id: {
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
      altitude_depth_height: {
        type: Sequelize.DECIMAL(10, 3), 
        allowNull: false
      },
      age_from: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      age_to: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      language: {
        type: Sequelize.STRING(191),
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
      is_pickup: {
        type: Sequelize.ENUM('0','1'), 
        allowNull: false
      },
      activity_type: {
        type: Sequelize.ENUM('1','2'), 
        allowNull: false
      },
      single_day_categories: {
        type: Sequelize.ENUM('1','2', '3'), 
        allowNull: true
      },
      is_provide_all_parts: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      is_website: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      website_link: {
        type: Sequelize.STRING(191),
        allowNull: true
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
    await queryInterface.dropTable('adventure_activity_histories');
  }
  
};