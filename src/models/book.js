const mongoose = require("mongoose");
const { Schema } = mongoose;

// Book Schema
const bookSchema = new Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  aisle: { type: String, required: true },
  authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  bookshops: [{ type: Schema.Types.ObjectId, ref: "Bookshop" }],
});

module.exports = bookSchema;
