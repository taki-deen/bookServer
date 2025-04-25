const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBooks = async (req, res) => {
  const { authorId } = req.query;
  const books = await prisma.book.findMany({
    where: authorId ? { authorId: parseInt(authorId) } : undefined,
    include: { author: true },
  });
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await prisma.book.findUnique({
    where: { id },
    include: { author: true },
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { name, isbn, aisle, authorId } = req.body;
  try {
    //TODO: check if authorId exists in the authors table
    const newBook = await prisma.book.create({
      data: { name, isbn, aisle, authorId },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to create book", error });
  }
};

exports.updateBook = async (req, res) => {
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
};

exports.deleteBook = async (req, res) => {
  try {
    await prisma.book.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Book not found" });
  }
};
