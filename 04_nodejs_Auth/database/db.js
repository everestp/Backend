
const mongoose = require('mongoose')

const connectToDB = async ()=>{
   try {
           mongoose.connection.on('connected',()=>{
               console.log("Connection to databases sucessfully");
           })
   
           mongoose.connection.on('error',(err)=>{
               console.log("Error in connecting databases",err);
           })
           await mongoose.connect(process.env.MONGO_URL)
           
           
       } catch (error) {
           console.error("Failed to connect to database",error);
           process.exit(1);
       }
};


module.exports = connectToDB