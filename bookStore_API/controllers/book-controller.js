const Book = require("../models/book");

//get all books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of all Book fetched sucessfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Book Found in Database",
      });
    }
  } catch (error) {
    console.log("Error Creating the book ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!! Please try Again",
    });
  }
};

//get single book by ID
const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const bookDetailByID = await Book.findById(getCurrentBookID);
    if (!bookDetailByID) {
      res.status(404).json({
        success: false,
        message: "Book not Found with the currentID try different ID",
      });
    } else {
      res.status(200).json({
        success: true,
        message: " Book fetched sucessfully",
        data: bookDetailByID,
      });
    }
  } catch (error) {
    console.log("Error getting single Book  ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong Please try Again",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added Sucessfully",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log("Error Adding Book the book ", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong Please try Again",
    });
  }
};

const updateSingleBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const newBookFormData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookID,
      newBookFormData,
      { new: true }
    );
    if (updatedBook) {
      res.status(200).json({
        success: true,
        message: "Book is Update Sucessfully",
        data: updatedBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book is not found with current ID try different ID",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong Please try Again",
    });
  }
};
//delete book Controller
const deleteBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(getCurrentBookID);
    if (!deleteBook) {
      res.status(404).json({
        success: false,
        message: "Book is not found with current ID try different ID",
      });
    } else {
      res.status(200).json({
        message: "Book deleted !!",
      });
    }
  } catch (error) {
    console.log("Error Deleting the book ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!! Please try Again",
    });
  }
};







module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateSingleBook,
  deleteBook,
};
