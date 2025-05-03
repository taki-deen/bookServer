const mongoose = require("mongoose");
const authorSchema = require("./auther");
const bookSchema = require("./book");
const bookshopSchema = require("./bookshop");

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);
const Bookshop = mongoose.model("Bookshop", bookshopSchema);

module.exports = {
  Author,
  Book,
  Bookshop,
};
