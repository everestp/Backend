const { image } = require('../config/cloudinary')
const { uploadToCloudinary } = require('../helper/cloudinaryHelper')
const Image = require('../models/image')
const fs = require('fs')
const cloudinary = require('../config/cloudinary')
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

        // delete the file form local storage
        fs.unlinkSync(req.file.path)

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


const fetchImagesController = async(req ,res)=>{
    try {
        const images = await Image.find({})
        if(images){
            res.status(200).json({
                success:true,
                data:images
            })
        }
    } catch (error) {
          console.log(error)
        res.status(500).json({
            success:false,
            message:'Somthing went wrong ! Please try again'
        })
    }
}
const deleteImageController = async()=>{
    try {
         const getCurrentIdOfImageToBeDeleted = req.params.id;
         const  userId = req.userInfo.userId;

         const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
         if(!image){
            return res.status(404).json({
                success:false,
                message:"Image not found"
            })
         }

  //check if this image is upload by current user who is trying to delete
  if(image.uploadeBy.toString() !== userId.toString()){
    return res.status(403).json({
         success:false,
         message:"You are not authorized to delete"
    })
  }


  //delete it form cloudinary storage
  await  cloudinary.uploader.destroy(image.publicId)

  // delete this image from mongodb basically Image object
  await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

  res.status(200).json({
    success:true,
    message:'Image deleted Sucessfully'
  })




    } catch (error) {
         res.status(500).json({
            success:false,
            message:'Somthing went wrong ! Please try again'
        })
    }
}

module.exports = {uploadImageController ,fetchImagesController ,deleteImageController}