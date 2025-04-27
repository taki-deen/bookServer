const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Get all authors
router.get('/', authorController.getAllAuthors);

// Get a single author by ID
router.get('/:id', authorController.getAuthorById);

// Create a new author
router.post('/', authorController.createAuthor);

// Update an author
router.put('/:id', authorController.updateAuthor);

// Delete an author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router; 