

const mongoose = require('mongoose')

const ImageSchmema = new mongoose.Schema({
    url:{
        type:String,
        require:true
    },
    
        publicId:{
            type:String,
            required:true
        },

    uploadeBy:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model('Image',ImageSchmema)