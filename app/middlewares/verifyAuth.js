const jwt = require('jsonwebtoken');
const {
  errorMessage, status,
} = require('../helpers/status';

require('dotenv').config();


const validateUserToken = async(req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    errorMessage.error = 'Token not provided.';
    res.status(status.bad).errorMessage;
  }

  try {
    const decoded = jwt.verify(token, process.env.DB_SECRET);
    req.user = {
      email: decoded.email,
      id: decoded.id,
      name: decoded.name,
      // TODO add role/is_admin
    };

    next();
  } 
  catch (error) {
    errorMessage.error = 'Authentication failed.';
    return res.status(status.unauthorized).send(errorMessage);
  } 
}

module.exports = {validateUserToken}