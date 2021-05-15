const express = require('express');

const { 
  createUser,
  getAllUsers,
  loginUser } = require('../controllers/userController');

let router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/users/login', loginUser);

module.exports = router;