 const mongoose = require('mongoose')


const connectDB = async ()=>{

    try {
        mongoose.connection.on('connected',()=>{
            console.log("Connection to databases sucessfully")
        })

        mongoose.connection.on('error',(err)=>{
            console.log("Error in connecting databases",err)
        })
        await mongoose.connect("mongodb+srv://everestp:Everest@cluster0.6afcl9x.mongodb.net/")
        
        
    } catch (error) {
        console.error("Failed to connect to database",error)
        process.exit(1)
    }
   
}
connectDB()
 const  userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    isActive:Boolean,
    tags:[String],
    createdAt :{type:Date,default:Date.now}
 })


 // Create UserModel
 const User = mongoose.model('User',userSchema)


 async function runQueryExample() {
    try {
        //Creaste a new Document
        const newUser = await User.create({
             name:"Everest paudel",
    email:"everest@gmail.com",
    age: 20,
    isActive:true,
    tags:['developer','designer','manager'],
        })
        console.log("New user Created ",newUser)





        
    } catch (error) {
        console.log('Error->',error)
    }
    
 }
 runQueryExample()


