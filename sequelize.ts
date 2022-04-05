import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';

const config = require('./src/config/config')[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    logging: false,
    models: [__dirname + '/src/models/**/*.model.ts'],
    modelMatch: (filename, member) =>
      filename.substring(0, filename.indexOf('.model')) ===
      member.toLowerCase(),
  }
);
console.log('Database Connected!');
