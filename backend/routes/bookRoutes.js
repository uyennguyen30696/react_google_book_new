const express = require('express');
const { createBook, getSavedBooks, deleteBook } = require('../controllers/bookController.js');

const router = express.Router();

router.post('/', createBook); // Create a new book
router.get('/', getSavedBooks); // Retrieve all saved books from database
router.delete('/:id', deleteBook); // Delete a book by ID

module.exports = router;