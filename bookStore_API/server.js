require('dotenv').config()


const express = require('express')
const connectToDB = require('./database/db')


const app = express()
const PORT = process.env.PORT ||3000;


// connect our databases
connectToDB();

//middleware ->express.json()

app.use(express.json())



app.listen(PORT ,()=>{
    console.log("Server is running",PORT);
})




