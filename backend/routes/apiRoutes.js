const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/searchController');

// Define the route for searching books
router.get('/search', searchBooks);

module.exports = router;
