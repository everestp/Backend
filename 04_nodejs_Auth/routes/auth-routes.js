const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth-controller');
const authRouter = express.Router();

//all routes all related to user Authentication and Authorization

router.post('/register',registerUser);
router.post('/login',loginUser)




module.exports = authRouter

