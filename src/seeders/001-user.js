const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [
      {
        email: 'admin@gmail.com',
        username: 'admin',
        password: bcrypt.hashSync('123456', 8),
        isActive: '1',
        isAdmin: '1',
      },
      {
        email: 'user@gmail.com',
        username: 'user',
        password: bcrypt.hashSync('123456', 8),
        isActive: '1',
        isAdmin: '0',
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
