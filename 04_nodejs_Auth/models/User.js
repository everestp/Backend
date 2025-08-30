const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required :true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required :true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','admin'], //Only allow  user and admin role
        default:'user'
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);