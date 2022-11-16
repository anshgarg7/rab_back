'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_price_histories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      activity_price_id: {
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
      rate_type: {
        type: Sequelize.ENUM('1','2','3'), 
        allowNull: false
      },
      no_of_person: {
        type:Sequelize.INTEGER(11), 
        allowNull:true
      },
      vendor_amount: {
        type: Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
        allowNull: false
      },
      admin_amount: {
        type: Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(8, 2), 
        defaultValue: 0.00,
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
    await queryInterface.dropTable('activity_price_histories');
  }

};