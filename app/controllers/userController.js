// import moment from 'moment';
// import dbQuery from '../db/dbQuery';

const { dbQuery } = require("../db/dbQuery");
const { successMessage, errorMessage, status } = require('../helpers/status');
const { 
  isEmpty,
  isValidEmail,
  generateUserToken,
  hashPassword,
  validatePassword
} = require('../helpers/validations');
const EMAIL_EXISTS_ROUTINE = '_bt_check_unique';

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

  if (isEmpty(email) || isEmpty(name) || isEmpty(password)) {
    errorMessage.error = 'Email, password, first name and last name field cannot be empty';
    
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidEmail(email)) {
    errorMessage.error = 'Email is invalid.';

    return res.status(status.bad).send(errorMessage);
  }

  if(!validatePassword(password)) {
    errorMessage.error = 'Password is invalid.';

    return res.status(status.bad).send(errorMessage);
  }

  try {
    const hashedPassword = await hashPassword(password);
  
    const createUserQuery = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}') returning *;`
    
    console.log(`query: ${createUserQuery}`);
    const { rows } = await dbQuery(createUserQuery);
    const dbResponse = rows[0];
    console.log(dbResponse);


    // delete password from db.response
    delete dbResponse.password;
    // create user token
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.name);
    // add response and token to success.data
    successMessage.data = dbResponse;
    successMessage.data.token = token;

    return res.status(status.success).send(successMessage);
  } 
  catch (error) {
    if (error.routine  === EMAIL_EXISTS_ROUTINE) {
      errorMessage.error = 'email already exists';

      return res.status(status.conflict).send(errorMessage);
    }
    
    errorMessage.error = 'Function was not successful';
    return res.status(status.error).send(error);
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