const express = require("express");
const app = express();
require("dotenv").config();

const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/author", authorRoutes);

module.exports = app;
