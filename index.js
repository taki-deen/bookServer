const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

// Get all books or filter by author
app.get("/books", async (req, res) => {
  const { author } = req.query;
  const books = await prisma.book.findMany({
    where: author ? { author } : undefined,
  });
  res.json(books);
});

// Get book by ID
app.get("/book/:id", async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Add new book
app.post("/book", async (req, res) => {
  const { name, isbn, aisle, author } = req.body;
  const newBook = await prisma.book.create({
    data: { name, isbn, aisle, author },
  });
  res.status(201).json(newBook);
});

// Update book
app.put("/book/:id", async (req, res) => {
  const { name, isbn, aisle, author } = req.body;
  try {
    const updated = await prisma.book.update({
      where: { id: parseInt(req.params.id) },
      data: { name, isbn, aisle, author },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete book
app.delete("/book/:id", async (req, res) => {
  try {
    await prisma.book.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(port, () => {
  console.log(`✅ API is running on http://localhost:${port}`);
});
