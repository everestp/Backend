
require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db')

//call the import module
connectToDB()

const app = express();

const PORT = process.env.PORT ||3000;

app.listen(PORT ,()=>{
    console.log("Server is listening",PORT)
})
