
require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');


//call the import module
connectToDB()

const app = express();

//for  json parser 
app.use(express.json())

const PORT = process.env.PORT ||3000;
app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)



app.listen(PORT ,()=>{
    console.log("Server is listening",PORT)
})
