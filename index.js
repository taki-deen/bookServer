const express = require("express");
require("dotenv").config();
const app = express();

const port = process.env.PORT;

app.use(express.json());

// Simulated in-memory data
let bookList = [
  { id: 1, name: "Item One", isbn: "111", aisle: "222", author: "Author One" },
  { id: 2, name: "why your are .. ", isbn: "111", aisle: "222", author: "ali" },
  { id: 2, name: "how to ..", isbn: "113", aisle: "224", author: "ali" },
  {
    id: 3,
    name: "book three",
    isbn: "115",
    aisle: "226",
    author: "Author Three",
  },
  {
    id: 4,
    name: "book four",
    isbn: "117",
    aisle: "228",
    author: "Author Four",
  },
];

app.get("/", (req, res) => {
  res.send("Hello taqi!");
});
app.get("/books", (req, res) => {
  const author = req.query.author;
  console.log(author);
  if (author) {
    const filteredBooks = bookList.filter((book) => book.author === author);
    return res.json(filteredBooks);
  }

  res.json(bookList);
});

app.get("/book/:id", (req, res) => {
  // res.json(bookList);
  const bookId = parseInt(req.params.id, 10);
  const book = bookList.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

app.post("/book", (req, res) => {
  const newBook = {
    id: bookList.length + 1,
    name: req.body.name,
    isbn: req.body.isbn,
    aisle: req.body.aisle,
    author: req.body.author,
  };

  bookList.push(newBook);
  res.status(201).json(newBook);
});

// PUT - Update an book
app.put("/book/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = bookList.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const updatedItem = {
    ...bookList[itemIndex],
    ...req.body,
  };

  bookList[itemIndex] = updatedItem;
  res.json(updatedItem);
});

app.patch("/book/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = bookList.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const updatedItem = {
    ...bookList[itemIndex],
    ...req.body,
  };

  bookList[itemIndex] = updatedItem;
  res.json(updatedItem);
});

// DELETE - Delete an book
app.delete("/book/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = bookList.findIndex((b) => b.id === bookId);
  console.log(bookIndex);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  bookList = bookList.filter((b) => b.id != bookId);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
