const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth-controller');
const authRouter = express.Router();

//all routes all related to user Authentication and Authorization

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser)




module.exports = authRouter

