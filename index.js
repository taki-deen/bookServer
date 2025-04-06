const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./views"); // المجلد اللي رح نضع فيه ملفات الواجهات

// Show form to add a new book
app.get("/ui/new", (req, res) => {
  res.render("newBook");
});

// List all books in UI
app.get("/ui/books", async (req, res) => {
  const books = await Book.find({});
  res.render("bookList", { books });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // to serve static files like CSS, JS, images
app.use("/assets", express.static("assets")); // to serve static files like CSS, JS, images
app.get("/", (req, res) => {
  res.send("Hello taqi!");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error getting books", error: err });
  }
});

app.post("/book", async (req, res) => {
  if (!req.body.name || !req.body.isbn || !req.body.aisle) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    // res.status(201).json(newBook);
    res.redirect("/ui/books"); // Redirect to the list of books after saving
  } catch (err) {
    res.status(500).json({ message: "Error saving book", error: err });
  }
});

// PUT - Update an book
app.put("/book/:bookId", async (req, res) => {
  const bookId = req.params.bookId; // MongoDB uses ObjectId, no need to parse it as integer

  if (!req.body.name || !req.body.isbn || !req.body.aisle || !req.body.author) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Update the book by its ObjectId
  const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
    new: true, // This option returns the updated document
  });

  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(updatedBook);
});

app.delete("/book/:bookId", async (req, res) => {
  const bookId = req.params.bookId; // MongoDB uses ObjectId, no need to parse it as integer

  const deletedBook = await Book.findByIdAndDelete(bookId);

  if (!deletedBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
