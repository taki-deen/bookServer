const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books or filter by authorId
router.get('/', bookController.getAllBooks);

// Get a single book by ID
router.get('/:id', bookController.getBookById);

// Create a new book
router.post('/', bookController.createBook);

// Update a book
router.put('/:id', bookController.updateBook);

// Delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router; 