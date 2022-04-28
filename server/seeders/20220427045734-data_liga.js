'use strict';
const pathJson = require('../liga.json')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ligas', pathJson.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    }), {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
