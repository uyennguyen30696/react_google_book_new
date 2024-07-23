const mongoose = require('mongoose');

const UserBookSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true },
    status: { type: String, enum: ['not started', 'in progress', 'finished'], required: true },
    addedDate: { type: Date, default: Date.now }
});

const UserBooks = mongoose.model('UserBooks', UserBookSchema);

module.exports = UserBooks;
