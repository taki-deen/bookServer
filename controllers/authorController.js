const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllAuthors = async (req, res) => {
  const authors = await prisma.author.findMany({
    include: { books: true }
  });
  res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const id = parseInt(req.params.id);
  const author = await prisma.author.findUnique({
    where: { id },
    include: { books: true }
  });
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
};

exports.createAuthor = async (req, res) => {
  const { name, bookIds } = req.body;
  try {
    const newAuthor = await prisma.author.create({
      data: {
        name,
        books: bookIds ? {
          connect: bookIds.map(id => ({ id: parseInt(id) }))
        } : undefined
      },
      include: { books: true }
    });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ message: "Failed to create author", error });
  }
};

exports.updateAuthor = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, bookIds } = req.body;
  try {
    const updated = await prisma.author.update({
      where: { id },
      data: {
        name,
        books: bookIds ? {
          set: bookIds.map(id => ({ id: parseInt(id) }))
        } : undefined
      },
      include: { books: true }
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: "Author not found", error });
  }
};

exports.deleteAuthor = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.author.delete({ 
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Author not found", error });
  }
};
