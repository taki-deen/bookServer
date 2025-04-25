const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBooks = async (req, res) => {
  const { authorId } = req.query;
  const books = await prisma.book.findMany({
    where: authorId ? {
      authors: {
        some: {
          id: parseInt(authorId)
        }
      }
    } : undefined,
    include: { 
      authors: true,
      bookshops: true 
    },
  });
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await prisma.book.findUnique({
    where: { id },
    include: { 
      authors: true,
      bookshops: true 
    },
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { name, isbn, aisle, authorIds } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: {
        name,
        isbn,
        aisle,
        authors: {
          connect: authorIds.map(id => ({ id: parseInt(id) }))
        }
      },
      include: {
        authors: true,
        bookshops: true
      }
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to create book", error });
  }
};

exports.updateBook = async (req, res) => {
  const { name, isbn, aisle, authorIds } = req.body;
  try {
    const updated = await prisma.book.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        isbn,
        aisle,
        authors: {
          set: authorIds.map(id => ({ id: parseInt(id) }))
        }
      },
      include: {
        authors: true,
        bookshops: true
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: "Book not found", error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await prisma.book.delete({ 
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Book not found", error });
  }
};
