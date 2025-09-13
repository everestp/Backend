const express = require('express');
const { createAuthor, createBook, getBookWithAuthor } = require('../controllers/book-controller');

const router = express.Router();

// Create a new author
router.post('/author', createAuthor);

// Create a new book with author ID
router.post('/book', createBook);

// Get a book by ID, including author details
router.get('/book/:id', getBookWithAuthor);

module.exports = router;
