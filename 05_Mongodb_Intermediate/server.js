

const express = require('express')
const mongoose = require('mongoose')
const connectToDB = require('./databases/db')

const app = express()

//connect to databases
connectToDB()



//use middlewares
app.use(express.json())

app.listen(3000, ()=>{
    console.log("Server is  runnging on port",3000)
})