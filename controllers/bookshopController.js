const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllBookshops = async (req, res) => {
  const { bookId } = req.query;
  const bookshops = await prisma.bookshop.findMany({
    where: bookId ? {
      books: {
        some: {
          id: parseInt(bookId)
        }
      }
    } : undefined,
    include: { books: true }
  });
  res.json(bookshops);
};

exports.getBookshopById = async (req, res) => {
  const id = parseInt(req.params.id);
  const bookshop = await prisma.bookshop.findUnique({
    where: { id },
    include: { books: true }
  });
  if (!bookshop) return res.status(404).json({ message: "Bookshop not found" });
  res.json(bookshop);
};

exports.createBookshop = async (req, res) => {
  const { name, address, bookIds } = req.body;
  try {
    const newBookshop = await prisma.bookshop.create({
      data: {
        name,
        address,
        books: bookIds ? {
          connect: bookIds.map(id => ({ id: parseInt(id) }))
        } : undefined
      },
      include: { books: true }
    });
    res.status(201).json(newBookshop);
  } catch (error) {
    res.status(400).json({ message: "Failed to create bookshop", error });
  }
};

exports.updateBookshop = async (req, res) => {
  const { name, address, bookIds } = req.body;
  try {
    const updated = await prisma.bookshop.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        address,
        books: bookIds ? {
          set: bookIds.map(id => ({ id: parseInt(id) }))
        } : undefined
      },
      include: { books: true }
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: "Bookshop not found", error });
  }
};

exports.deleteBookshop = async (req, res) => {
  try {
    await prisma.bookshop.delete({ 
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Bookshop not found", error });
  }
}; 