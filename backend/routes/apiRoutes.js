const express = require('express');
const { searchBooks } = require('../controllers/searchController');

const router = express.Router();

// Define the route for searching books
router.get('/search', searchBooks);

module.exports = router;
