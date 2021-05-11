// import moment from 'moment';
// import dbQuery from '../db/dbQuery';

const { dbQuery } = require("../db/dbQuery");

// import validators

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
  const { name, email, password } = req.body;

  // TODO:
  // check if email already exists 
  // hash password
  const createUserQuery = `INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password});`

  try {
    const { rows } = await dbQuery(createUserQuery);
    const dbResponse = rows;
    console.log(rows);
    
    return res.json(dbResponse);

  } catch (error) {

    return res.send(error);
  }
}

const doesEmailExist = async (email) => {
  const doesEmailExistQuery = `SELECT * FROM users WHERE email=${email};`;

  try {
    const { rows } = await dbQuery(doesEmailExistQuery);
    const dbResponse = rows;
    console.log(rows);

    if (dbResponse[0] === undefined) {
      console.log("There are no users with that email");

      return true;
    }

    return false;

  } catch (error) {
    // log error somehow
    console.error(error);
    
    return false;
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