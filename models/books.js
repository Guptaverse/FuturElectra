const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    isbn: String,
    authors: [String],
    country: String,
    number_of_pages: Number,
    publisher: String,
    release_date: String,
  });

const Book = mongoose.model("books", bookSchema);

module.exports = Book;