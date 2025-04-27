const mongoose = require('mongoose');
const { Schema } = mongoose;

// Author Schema
const authorSchema = new Schema({
  name: { type: String, required: true }
});

// Book Schema
const bookSchema = new Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  aisle: { type: String, required: true },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
  bookshops: [{ type: Schema.Types.ObjectId, ref: 'Bookshop' }]
});

// Bookshop Schema
const bookshopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
const Bookshop = mongoose.model('Bookshop', bookshopSchema);

module.exports = {
  Author,
  Book,
  Bookshop
}; 