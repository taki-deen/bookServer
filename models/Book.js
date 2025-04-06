const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  isbn: String,
  aisle: String,
  author: String,
});

module.exports = mongoose.model("Book", bookSchema);
