const Book  = require("../models/book");


//get all books
const getAllBooks = async (req ,res)=>{
try {
 const allBooks = await Book.find()
 if(allBooks?.length >0){
    res.status(200).json({
        success:true,
        message:"List of all Book fetched sucessfully",
        data:allBooks

    }) 
 } else {
    res.status(404).json({
        success:false,
        message:"No Book Found in Database"
    })
 }
 
} catch (error) {
     console.log("Error Creating the book ",error)
     res.status(500).json({
        success:false,
        message:"Something went wrong Please try Again"
     })

}




}


//get single book by ID   
const getSingleBookById = async (req ,res)=>{

}

const addNewBook = async (req ,res)=>{
try {
    const newBookFormData = req.body;
   const newlyCreatedBook = await Book.create(newBookFormData);
   if(newlyCreatedBook){
     res.status(201).json({
        success:true,
        message:'Book added Sucessfully',
        data:newlyCreatedBook
     })

   }



} catch (error) {
    console.log("Error Adding Book the book ",error)
   
     res.status(500).json({
        success:false,
        message:"Something went wrong Please try Again"
     })
}


}

const updateSingleBook = async (req ,res)=>{

}

//delete book Controller
const deleteBook = async (req ,res)=>{

}


module.exports ={getAllBooks ,getSingleBookById ,addNewBook ,updateSingleBook ,deleteBook }