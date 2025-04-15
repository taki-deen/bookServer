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
app.get("/books", async (req, res) => {
  const { authorId } = req.query;
  const books = await prisma.book.findMany({
    where: authorId ? { authorId: parseInt(authorId) } : undefined,
    include: { author: true }, // ← عرض معلومات المؤلف أيضًا إن أردت
  });
  res.json(books);
});


// Add new book
app.post("/book", async (req, res) => {
  const { name, isbn, aisle, authorId } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: { name, isbn, aisle, authorId },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to create book", error });
  }
});


// Update book
app.put("/book/:id", async (req, res) => {
  const { name, isbn, aisle, authorId } = req.body;
  try {
    const updated = await prisma.book.update({
      where: { id: parseInt(req.params.id) },
      data: { name, isbn, aisle, authorId },
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

app.get("/books", async (req, res) => {
  const { authorId } = req.query;
  const books = await prisma.book.findMany({
    where: authorId ? { authorId: parseInt(authorId) } : undefined,
    include: { author: true }, // ← عرض معلومات المؤلف أيضًا إن أردت
  });
  res.json(books);
});


app.get("/author/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const author = await prisma.author.findUnique({
    where: { id },
    include: { books: true },
  });
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
});

app.post("/author", async (req, res) => {
  const { name } = req.body;
  const newAuthor = await prisma.author.create({
    data: { name },
  });
  res.status(201).json(newAuthor);
});

app.put("/author/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const updated = await prisma.author.update({
      where: { id },
      data: { name },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ message: "Author not found" });
  }
});

//delete author
app.delete("/author/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.author.delete({
      where: { id },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Author not found" });
  }
});

app.listen(port, () => {
  console.log(`✅ API is running on http://localhost:${port}`);
});
