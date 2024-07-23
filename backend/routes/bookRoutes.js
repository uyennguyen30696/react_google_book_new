const express = require('express');
const { addBook, getSavedBooks, deleteBook, getOneSavedBook, updateBookStatus } = require('../controllers/bookController.js');

const router = express.Router();

router.post('/', addBook); // Add a new book
router.get('/', getSavedBooks); // Retrieve all saved books from database for the logged in user
router.delete('/:id', deleteBook); // Delete a book by ID
router.post('/search', getOneSavedBook); // Search for a book by title
router.put('/:id/status', updateBookStatus); // Update book status

module.exports = router;