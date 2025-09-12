const { image } = require('../config/cloudinary')
const { uploadToCloudinary } = require('../helper/cloudinaryHelper')
const Image = require('../models/image')

const uploadImageController = async(req ,res)=>{
    try {
        // Check ig file is missing is request object
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"File is Required Please upload a file"
            })
        }
        //upload to clodinary
        const {url ,publicId} = await uploadToCloudinary(req.file.path )

        //store the image url and pulic id along with uplaoded user Id to database

        const newlyUplaodedImage = new Image({
            url,
            publicId,
            uploadeBy :req.userInfo.userId
        })
        await newlyUplaodedImage.save();

        res.status(201).json({
            success:true,
            message: "image Uploaded successfully",
            image:newlyUplaodedImage
        })






    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Somthing went wrong ! Please try again'
        })
    }
}

module.exports = uploadImageController