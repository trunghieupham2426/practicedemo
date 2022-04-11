module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Product', [
      {
        productName: 'ao nam',
        desc: 'man man hehe',
        thumpNail:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
        price: 200,
        unitsInStock: 10,
        productStatus: 'active',
      },
      {
        productName: 'ao nu',
        desc: 'ao nu',
        thumpNail:
          'https://res.cloudinary.com/dyw35assc/image/upload/v1649522341/CATEGORY/jeszw7tsxwrkye5qoe75.jpg',
        price: 150,
        unitsInStock: 20,
        productStatus: 'active',
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
