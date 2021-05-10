// import moment from 'moment';
// import dbQuery from '../db/dbQuery';

const { dbQuery } = require("../db/dbQuery");

// import validators

// app.get('/users', (req, res) => {
//   //res.json({ message: "Welcome to water your plants application." });
//   res.send('<h1>Welcome to water your plants application.</h1>')
// });

const getAllUsers = async (req, res) => {
  const getAllUsersQuery = 'SELECT * FROM users ORDER BY id DESC;';

  try{
    const { rows } = await dbQuery(getAllUsersQuery);
    const dbResponse = rows;

    if (dbResponse[0] === undefined) {
      return res.send("There are no users");
    }
    
    return res.json(dbResponse);

  } catch (error) {

    return res.send(error);
  }
}

const createUser = async (req, res) => {
  const createUserQuery = `INSERT INTO users (name, email, password) VALUES ('TESTer', 'test1@email.com', 'password1');`

  try{
    const { rows } = await dbQuery(createUserQuery);
    const dbResponse = rows;
    console.log(rows);
    
    return res.json(dbResponse);

  } catch (error) {

    return res.send(error);
  }
}

module.exports = { getAllUsers, createUser }

// app.get('/users/login', (req, res) => {
//   //res.json({ message: "Welcome to water your plants application." });
//   res.send('<h1>Welcome to water your plants application.</h1>')
// });

// app.post('/users/register', (req, res) => {
//   let {name, email, password} = req.body;

  
//   let errors = [];
//   // todo
//   // check if all required info exists and are valid
//   if (!name || !email || !password) {
//     errors.push({message: 'Request has missing data.'});
//   }

//   if (password.length < 8) {
//     errors.push({message: 'Password is less than 8 characters'});
//   }


//   // verify that user email doesn't exist in db
//   // hash password
//   // store user in db
  
//   if (errors.length > 1) {
//     res.json(errors);
//     return;
//   }

//   res.json({
//     message:'User Added'
//   });
// });