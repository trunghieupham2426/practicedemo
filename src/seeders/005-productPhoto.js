module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductPhoto', [
      {
        imagePath:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
        productId: '1',
      },
      {
        imagePath:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
        productId: '1',
      },
      {
        imagePath:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
        productId: '2',
      },
      {
        imagePath:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
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
