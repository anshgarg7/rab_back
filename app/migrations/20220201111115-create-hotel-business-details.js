'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hotel_business_details', {
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
      business_name: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      aletrnate_country_iso: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      aletrnate_country_code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      aletrnate_mobile_no: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(191),
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
      gst_no: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('hotel_business_details');
  }

};