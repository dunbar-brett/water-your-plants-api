const express = require('express');

const { 
  createUser,
  getAllUsers,
  loginUser,
  // todo logout - deletes token
  // update user
} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.post('/users/login', loginUser);

module.exports = router;