'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taxi_bookings', {
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
      driver_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      price: {
        type:Sequelize.DECIMAL(8, 2),
        allowNull:false
      },
      total_price: {
        type:Sequelize.DECIMAL(8, 2), 
        allowNull:false
      },
      start_date_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pickup_latitude: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      pickup_longitude: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      drop_latitude: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      drop_longitude: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      pickup_location: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      drop_location: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('1','2','3','4','5'), 
        defaultValue: "1",
        allowNull: false
      },
      is_skip: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
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
    await queryInterface.dropTable('taxi_bookings');
  }

};