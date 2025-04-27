const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Import models
const { Author, Book, Bookshop } = require('./models');

// Import routes
const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const bookshopRoutes = require("./routes/bookshops");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4 // Use IPv4, skip trying IPv6
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("src/public"));
app.use("/assets", express.static("src/assets"));

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/bookshops", bookshopRoutes);

// UI Routes
app.get("/ui", (req, res) => {
  res.render("dashboard");
});

app.get("/ui/new", async (req, res) => {
  try {
    const authors = await Author.find();
    const bookshops = await Bookshop.find();
    res.render("newBook", { authors, bookshops });
  } catch (error) {
    console.error("Error fetching data for new book form:", error);
    res.status(500).render("newBook", { 
      authors: [], 
      bookshops: [],
      error: "Failed to load form data"
    });
  }
});

app.get("/ui/new-author", (req, res) => {
  res.render("newAuthor");
});

app.get("/ui/new-bookshop", (req, res) => {
  res.render("newBookshop");
});

app.get("/ui/books", async (req, res) => {
  try {
    const books = await Book.find()
      .populate('authors')
      .populate('bookshops');
    res.render("bookList", { 
      books,
      error: null 
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).render("bookList", { 
      books: [],
      error: "Failed to load books. Please try again later."
    });
  }
});

app.get("/ui/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.render("authorList", { authors });
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).render("authorList", { 
      authors: [],
      error: "Failed to load authors"
    });
  }
});

app.get("/ui/bookshops", async (req, res) => {
  try {
    const bookshops = await Bookshop.find();
    res.render("bookshopList", { bookshops });
  } catch (error) {
    console.error("Error fetching bookshops:", error);
    res.status(500).render("bookshopList", { 
      bookshops: [],
      error: "Failed to load bookshops"
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 