'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      category_id: { 
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      title: { 
        type:Sequelize.STRING(50), 
        allowNull:false
      },
      image: { 
        type:Sequelize.STRING(191), 
        allowNull:false
      },
      beginner_level_point: { 
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      intermediate_level_point: { 
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      expert_level_point: { 
        type: Sequelize.INTEGER(11),
        allowNull:false
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
    await queryInterface.dropTable('activities');
  }
  
};