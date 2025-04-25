const express = require("express");
const app = express();
require("dotenv").config();

const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const bookshopRoutes = require("./routes/bookshops");

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/author", authorRoutes);
app.use("/bookshops", bookshopRoutes);

module.exports = app;
