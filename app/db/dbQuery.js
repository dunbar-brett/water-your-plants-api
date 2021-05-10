// import pool from './pool';
const db = require('../config/db.config');

// export default {
//   query (queryText, params) {
//     return new Promise ((resolve, reject) => {
//       db.pool.query(queryText, params)
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         })
//     });
//   },
// }

const dbQuery = (queryText, params) => {
  return new Promise ((resolve, reject) => {
    db.pool.query(queryText, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

module.exports = { dbQuery }