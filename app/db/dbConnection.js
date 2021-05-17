/* eslint-disable no-unused-vars */
const db = require('../config/db.config');

const dbPoolOn = () => {
  db.pool.on('connect', () => {
    console.log('connected to the db');
  });
}

const dbPoolOff = () => {
  db.pool.end();
}

/* Create user table */
const createUsersTable = () => {
  const usersCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL);`;

  db.pool.query(usersCreateQuery)
    .then((res) => {
      console.log('SUCCESS: Users');
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: Users');
      console.log(err);
      // db.pool.end();
    });
}

/* Drop user table */
const dropUsersTable = () => {
  const usersDropQuery = `DROP TABLE IF EXISTS users`;

  db.pool.query(usersDropQuery)
    .then((res) => {
      console.log('SUCCESS: Users');
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: Users');
      console.log(err);
      // db.pool.end();
    });
}

/*  Create plant table */
const createPlantsTable = () => {
  const createPlantTableQuery = `CREATE TABLE IF NOT EXISTS plants
  (id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) NOT NULL, 
  location_id INTEGER REFERENCES locations (id) ON DELETE CASCADE,
  sun_req_id INTEGER REFERENCES sun_reqs (id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, 
  water_frequency VARCHAR(100), 
  fertilizer_frequency VARCHAR(100), 
  last_watered DATE,
  last_fertilized DATE,
  created_on DATE NOT NULL);`;

  db.pool.query(createPlantTableQuery)
    .then((res) => {
      console.log('SUCCESS: Plants');
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: Plants');
      console.log(err);
      // db.pool.end();
    });
}

/* Drop plant table */
const dropPlantsTable = () => {
  const plantsDropQuery = `DROP TABLE IF EXISTS plants;`;

  db.pool.query(plantsDropQuery)
    .then((res) => {
      console.log('SUCCESS: Plants');
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: Plants');
      console.log(err);
      // db.pool.end();
    });
}


/*  Create locations table */
const createLocationsTable = () => {
  const locationsCreateQuery = `CREATE TABLE IF NOT EXISTS locations
  (id SERIAL PRIMARY KEY, 
  location VARCHAR(100) UNIQUE NOT NULL,
  created_on DATE NOT NULL);`;

  db.pool.query(locationsCreateQuery)
    .then((res) => {
      console.log('SUCCESS: Locations');
      //console.log(res);
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: Locations');
      //console.log(err);
      // db.pool.end();
    });
}

/* Drop locations table */
const dropLocationsTable = () => {
  const locationsDropQuery = `DROP TABLE IF EXISTS locations;`;

  db.pool.query(locationsDropQuery)
    .then((res) => {
      console.log('SUCCESS: Locations');
      //console.log(res);
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: Locations');
      //console.log(err);
      // db.pool.end();
    });
}


/*  Create sun_reqs table */
const createSunReqsTable = () => {
  const usersCreateQuery = `CREATE TABLE IF NOT EXISTS sun_reqs
  (id SERIAL PRIMARY KEY, 
  requirements VARCHAR(100) UNIQUE NOT NULL,
  created_on DATE NOT NULL);`;

  db.pool.query(usersCreateQuery)
    .then((res) => {
      console.log('SUCCESS: sun_reqs');
      //console.log(res);
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: sun_reqs');
      //console.log(err);
      // db.pool.end();
    });
}

/* Drop sun_reqs table */
const dropSunReqsTable = () => {
  const locationsDropQuery = `DROP TABLE IF EXISTS sun_reqs;`;

  db.pool.query(locationsDropQuery)
    .then((res) => {
      console.log('SUCCESS: sun_reqs');
      //console.log(res);
      // db.pool.end();
    })
    .catch((err) => {
      console.log('ERROR: sun_reqs');
      //console.log(err);
      // db.pool.end();
    });
}

/**
 * Create All Tables
 */
const createAllTables = () => {
  // TODO this needs some work -- timing issue?
  dbPoolOn();
  createLocationsTable();
  createPlantsTable();
  createSunReqsTable();
  createUsersTable();
  dbPoolOff();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  // TODO this needs some work
  dbPoolOn();
  dropUsersTable();
  dropLocationsTable();
  dropSunReqsTable();
  dropPlantsTable();
  dbPoolOff();
};
module.exports = { createAllTables, dropAllTables }

require('make-runnable');