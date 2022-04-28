'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyBookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Users",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ligaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Ligas",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('MyBookmarks');
  }
};