require('dotenv').config();

const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === 'prod'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const pool = new Pool ({
  connectionString: isProd ? process.env.DATABASE_URL : connectionString,
});

module.exports = { pool };


// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "123", // try to get this somewhere else
//   DB: "testdb", // same as above
//   dialect: "postgres",
//   pool: {
//     max: 5, 
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };