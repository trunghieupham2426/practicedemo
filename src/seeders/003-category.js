module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Category', [
      {
        categoryName: 'man',
        desc: 'man man hehe',
        thumpNail:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
      },
      {
        categoryName: 'woman',
        desc: 'abcd ',
        thumpNail:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
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
