const mongoose = require('mongoose');
const { Schema } = mongoose;

// Bookshop Schema
const bookshopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = bookshopSchema;