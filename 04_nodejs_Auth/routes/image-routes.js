

const express = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const isAdminUser = require('../middleware/admin-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const {uploadImageController ,fetchImagesController, deleteImageController} = require('../controllers/image-contoller')


const router = express.Router()


//upload Image
router.post('/upload',authMiddleware,isAdminUser,uploadMiddleware.single('image') ,uploadImageController)

//to get all the image
router.get('/get', authMiddleware ,fetchImagesController)
router.delete('/:id',authMiddleware,isAdminUser,deleteImageController)




module.exports = router