const express = require('express');
const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
const authRouter = express.Router();

//all routes all related to user Authentication and Authorization

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser)
authRouter.post('/change-password',authMiddleware,changePassword)



module.exports = authRouter

