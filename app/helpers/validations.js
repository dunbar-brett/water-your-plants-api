/* eslint-disable no-undef */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  // check for whitespace
  if (input.replace(/\s/g, '').length) {
    return false;
  }
  
  return true;
};

const generateUserToken = (email, id, name) => {
  // todo save this to a table
  const token = jwt.sign(
    {
      email,
      id,
      name
    },
    process.env.DB_SECRET,
    {
      expiresIn: '10m'
    }
  );

    return token;
}

const isValidEmail = (email) => {
  // regex for email, there likely is a better one
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const isValidPassword = (password) => {
  if (password.length <= 6 || password === '') {
    return false;
  } 
  
  // TODO add more password strength

  return true;
};


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const passwordsMatch = (dbPassword, password) => {
  // console.log(`dbPassword: ${dbPassword}`)
  // console.log(`password: ${password}`)
  return bcrypt.compareSync(password, dbPassword);
}

module.exports = { 
  isEmpty,
  generateUserToken,
  isValidEmail,
  isValidPassword,
  passwordsMatch,
  hashPassword };