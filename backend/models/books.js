const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    publishedDate: { type: String, required: true },
    pageCount: { type: Number, required: true },
    categories: { type: [String], required: true }
  });
  
const Books = mongoose.model('Books', bookSchema);
  
module.exports = Books;