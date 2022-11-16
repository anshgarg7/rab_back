'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taxi_driver_business_details', {
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
      brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      model_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      registration_no: {
        type: Sequelize.STRING(191),
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
      driving_area_radius: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      license_no: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      license_expiry_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      license_fornt_image: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      license_back_image: {
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
    await queryInterface.dropTable('taxi_driver_business_details');
  }

};