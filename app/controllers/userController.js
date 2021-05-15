// import moment from 'moment';
// import dbQuery from '../db/dbQuery';

const { dbQuery } = require("../db/dbQuery");
const { successMessage, errorMessage, status } = require('../helpers/status');
const { 
  isEmpty,
  isValidEmail,
  isValidPassword,
  generateUserToken,
  passwordsMatch,
  hashPassword,
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

/*
  CREATE USER
*/
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

  if(!isValidPassword(password)) {
    errorMessage.error = 'Password is invalid.';

    return res.status(status.bad).send(errorMessage);
  }

  try {
    const hashedPassword = await hashPassword(password);
  
    const createUserQuery = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}') returning *;`
    
    //console.log(`query: ${createUserQuery}`);
    const { rows } = await dbQuery(createUserQuery);
    const dbResponse = rows[0];
    //console.log(dbResponse);


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
    
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(error);
  }
}

/*
  LOGIN
*/
const loginUser = async(req, res) => {
  const { email, password } = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'email and password cannot be empty';

    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidEmail(email)) {
    errorMessage.error = 'Email is invalid.';

    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidPassword(password)) {
    errorMessage.error = 'Password is invalid.';

    return res.status(status.bad).send(errorMessage);
  }

  const loginUserQuery = 'SELECT * FROM users WHERE email = $1';

  try {
    const { rows } = await dbQuery(loginUserQuery, [email]);
    const dbResponse = rows[0];
    
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist.';
      
      return res.status(status.notfound).send(errorMessage);
    }

    // compare password here
    //console.log(dbResponse.password, password);
    if (!passwordsMatch(dbResponse.password, password)) {
      errorMessage.error = 'The password you provided is incorrect';
      return res.status(status.bad).send(errorMessage);
    }

    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.name);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;

    return res.status(status.success).send(successMessage);
  }
  catch (error) {
    errorMessage.error = 'Operation was not successful.';
    return res.status(status.error).send(error);
  }
}



module.exports = { getAllUsers, createUser, loginUser }
