const express = require('express');

// import controller methods from users controller
const { 
  getAllUsers,
  createUser } = require('../controllers/userController');

let router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser)

module.exports = router;