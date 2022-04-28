'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ligas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      abbr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "Categories",
          key:"id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      authorId: {
        type: Sequelize.INTEGER,
        reference: {
          model: "Users",
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
    await queryInterface.dropTable('Ligas');
  }
};