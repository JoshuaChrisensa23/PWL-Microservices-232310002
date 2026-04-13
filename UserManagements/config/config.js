require("dotenv").config();

// MongoDB Configuration menggunakan variabel lingkungan dengan fallback ke nilai default
const host = process.env.EXPRESS_Mongo_DB_HOST || "localhost";
const port = process.env.EXPRESS_Mongo_DB_PORT || "27017";
const name = process.env.EXPRESS_Mongo_DB_NAME || "pw_praktikum_db";
const user = process.env.EXPRESS_Mongo_DB_USERNAME;
const pass = process.env.EXPRESS_Mongo_DB_PASSWORD;

// Ekspor konfigurasi untuk berbagai lingkungan (development, test, production)
module.exports = {
    development: {
        url: `mongodb://${host}:${port}/${name}`
    },
    test: {
        url: `mongodb://${host}:${port}/${name}_test`
    },
    production: {
        url: `mongodb://${user}:${pass}@${host}:${port}/${name}?authSource=admin`
    }
};