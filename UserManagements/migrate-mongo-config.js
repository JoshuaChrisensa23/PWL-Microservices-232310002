// migrate-mongo-config.js
module.exports = {
  mongodb: {
    url: "mongodb://admin:password123@localhost:27017?authSource=admin",
    databaseName: "pw_praktikum_db",
    options: {
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  moduleSystem: 'commonjs',
};