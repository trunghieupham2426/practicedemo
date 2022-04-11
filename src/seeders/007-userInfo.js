module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserInfo', [
      {
        userId: '1',
      },
      {
        userId: '2',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
