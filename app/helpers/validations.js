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
  const token = jwt.sign(
    {
      email,
      id,
      name
    },
    process.env.DB_SECRET,
    {
      expiresIn: '1d'
    }
  );

    return token;
}

const isValidEmail = (email) => {
  // regex for email, there likely is a better one
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 6 || password === '') {
    return false;
  } 
  
  // TODO add more password strength

  return true;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

module.exports = { isEmpty, generateUserToken, isValidEmail, validatePassword, hashPassword };