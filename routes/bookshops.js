const express = require('express');
const router = express.Router();
const bookshopController = require('../controllers/bookshopController');

// Get all bookshops or filter by bookId
router.get('/', bookshopController.getAllBookshops);

// Get a single bookshop by ID
router.get('/:id', bookshopController.getBookshopById);

// Create a new bookshop
router.post('/', bookshopController.createBookshop);

// Update a bookshop
router.put('/:id', bookshopController.updateBookshop);

// Delete a bookshop
router.delete('/:id', bookshopController.deleteBookshop);

module.exports = router; 