const Book = require('../models/books.js'); 

// Create a new book
const createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get saved books from MongoDB
const getSavedBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve books.' });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            res.status(404).json({ error: 'Book not found.' });
        } else {
            res.status(200).json({ message: 'Book deleted successfully.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book.' });
    }
};

module.exports = { createBook,
                getSavedBooks,
                deleteBook }