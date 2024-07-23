const Books = require('../models/books');
const UserBooks = require('../models/userBooks'); 

// Add selected book to the logged in user's collection
const addBook = async (req, res) => {
    const bookData = req.body; 
    const userId = req.user.userId; // Get the user ID from the authenticated request
    const addedDate = new Date();
    const status = req.body.status || 'not started'; // Default status if not provided

    try {
        // Check if book exists in the books collection
        let book = await Books.findOne({ googleId: bookData.googleId });

        if (!book) {
            // If book does not exist, create a new entry
            const newBook = new Books(bookData);
            book = await newBook.save(); // Save the new book and get its ObjectId
        } else {
            console.log('Book already exists in Books collection.');
        }

        // Check if book is already in the user's collection
        const existingUserBook = await UserBooks.findOne({ user: userId, book: book._id }); // _id is the ObjectId of the book assigned by MongoDB when it's added to the books collection
        if (existingUserBook) {
            return res.status(400).json({ message: 'Book already in user\'s collection.' });
        }

        const userBook = new UserBooks({ user: userId, book: book._id, addedDate: addedDate, status: status });
        await userBook.save();
        res.status(201).json({ message: 'Book added to user\'s collection' });
    } catch (error) {
        console.error('Error adding book:', error); 
        res.status(500).json({ message: error.message });
    }
};

// Get saved books from MongoDB for the logged-in user
const getSavedBooks = async (req, res) => {
    const userId = req.user.userId; // Use userId from req.user

    try {
        // Find all books saved by the user and populate book details
        const userBooks = await UserBooks.find({ user: userId }).populate('book');
        res.status(200).json(userBooks.map(userBook => ({
            ...userBook.book.toObject(),
            addedDate: userBook.addedDate,
            status: userBook.status
        })));
    } catch (error) {
        console.error('Error retrieving saved books:', error);
        res.status(500).json({ error: 'Failed to retrieve user\'s books.' });
    }
};

// Delete a book from the logged in user's collection
const deleteBook = async (req, res) => {
    const { id } = req.params; // id is now the ObjectId of the book
    const userId = req.user.userId; 

    try {
        // Step 1: Remove the book from the user's collection
        const result = await UserBooks.findOneAndDelete({ user: userId, book: id }); 
        if (!result) {
            return res.status(404).json({ error: 'Book not found in user\'s collection.' });
        }

        // Step 2: Check if the book is an orphan (not associated with any user)
        const remainingUserBooks = await UserBooks.countDocuments({ book: id });

        if (remainingUserBooks === 0) {
            // Step 3: Remove the book from the Books collection if it is an orphan
            await Books.findByIdAndDelete(id);
            console.log('Removed orphan book from Books collection.');
        }

        res.status(200).json({ message: 'Book removed from user\'s collection.' });
    } catch (error) {
        console.error('Error removing book:', error);
        res.status(500).json({ error: 'Failed to remove book from user\'s collection.' });
    }
};

// Retrieve a specific book the logged in user searches for by title
const getOneSavedBook = async (req, res) => {
    const { title } = req.body; // Get the title from the request body
    const userId = req.user.userId; // Get the user ID from the authenticated request

    try {
        // Find the book by title in the user's collection and populate book details
        const userBooks = await UserBooks.find({ user: userId }).populate({
            path: 'book',
            match: { title: new RegExp(title, 'i') } // Case-insensitive and partial match
        });

        // Filter out any null results (if the book doesn't match the title)
        const books = userBooks.map(userBook => userBook.book).filter(book => book);

        if (books.length === 0) {
            res.status(200).json({ message: 'There is no book that matches your search!' });
        } else {
            res.status(200).json(books);
        }
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ error: 'Failed to retrieve book.' });
    }
};

// Update the status of a book in the user's collection
const updateBookStatus = async (req, res) => {
    const { bookId, status } = req.body; // Get the book ID and status from the request body
    const userId = req.user.userId; // Get the user ID from the authenticated request

    try {
        // Find the book in the user's collection
        const userBook = await UserBooks.findOne({ user: userId, book: bookId });
        if (!userBook) {
            return res.status(404).json({ message: 'Book not found in user\'s collection.' });
        }

        userBook.status = status; 
        await userBook.save();
        res.status(200).json({ message: 'Book status updated', userBook });
    } catch (error) {
        console.error('Error updating book status:', error);
        res.status(500).json({ message: 'Failed to update book status.' });
    }
};

module.exports = { addBook, getSavedBooks, deleteBook, getOneSavedBook, updateBookStatus };
