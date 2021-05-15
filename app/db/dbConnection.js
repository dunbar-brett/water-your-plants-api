const db = require('../config/db.config');

db.pool.on('connect', () => {
  console.log('connected to the db');
});

/* Create user table */
const createUserTable = () => {
  const usersCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

  db.pool.query(usersCreateQuery)
    .then((res) => {
      console.log(res);
      db.pool.end();
    })
    .catch((err) => {
      console.log(err);
      db.pool.end();
    });
}

/* drop user table */
const dropUserTable = () => {
  const usersDropQuery = `DROP TABLE IF EXISTS users`;

  db.pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      db.pool.end();
    })
    .catch((err) => {
      console.log(err);
      db.pool.end();
    });
}
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
};
module.exports = { createAllTables, dropAllTables }
