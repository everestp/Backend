
const mongoose = require('mongoose')


const ProductSchema = new  mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    inStock:{
        type:Boolean,
        require:true
    },
})

module.exports = mongoose.model("everest",ProductSchema)