module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductCategory', [
      {
        categoryId: '1',
        productId: '1',
      },
      {
        categoryId: '2',
        productId: '1',
      },
      {
        categoryId: '2',
        productId: '2',
      },
      {
        categoryId: '1',
        productId: '2',
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
