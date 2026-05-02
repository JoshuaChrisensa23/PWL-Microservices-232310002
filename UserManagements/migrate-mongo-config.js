// migrate-mongo-config.js
require('dotenv').config();

module.exports = {
  mongodb: {
    url: `mongodb://${process.env.EXPRESS_Mongo_DB_USERNAME}:${process.env.EXPRESS_Mongo_DB_PASSWORD}@${process.env.EXPRESS_Mongo_DB_HOST}:${process.env.EXPRESS_Mongo_DB_PORT}?authSource=admin`,
    databaseName: process.env.EXPRESS_Mongo_DB_NAME,
    options: {
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  moduleSystem: 'commonjs',
};