const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAuthorById = async (req, res) => {
  const id = parseInt(req.params.id);
  const author = await prisma.author.findUnique({
    where: { id },
    include: { books: true },
  });
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.json(author);
};

exports.createAuthor = async (req, res) => {
  const { name } = req.body;
  const newAuthor = await prisma.author.create({
    data: { name },
  });
  res.status(201).json(newAuthor);
};

exports.updateAuthor = async (req, res) => {
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
};

exports.deleteAuthor = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.author.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: "Author not found" });
  }
};
