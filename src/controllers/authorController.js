const { Author, Book } = require('../models');

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate('books');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch authors", error: error.message });
  }
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id).populate('books');
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch author", error: error.message });
  }
};

// Create a new author
exports.createAuthor = async (req, res) => {
  const { name } = req.body;
  try {
    const author = await Author.create({ name });
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: "Failed to create author", error: error.message });
  }
};

// Update an author
exports.updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const author = await Author.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    ).populate('books');

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    res.status(404).json({ message: "Failed to update author", error: error.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByIdAndDelete(id);
    
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Remove author reference from books
    await Book.updateMany(
      { authors: id },
      { $pull: { authors: id } }
    );

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Failed to delete author", error: error.message });
  }
}; 