const express = require('express');
const { createBook } = require('../controllers/bookController.js');

const router = express.Router();

router.post('/', createBook); // Create a new book

module.exports = router;