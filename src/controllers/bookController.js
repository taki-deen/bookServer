const { Book, Author, Bookshop } = require('../models');

// Get all books
exports.getAllBooks = async (req, res) => {
  const { authorId } = req.query;
  try {
    let query = {};
    if (authorId) {
      query.authors = authorId;
    }

    const books = await Book.find(query)
      .populate('authors')
      .populate('bookshops');
    
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id)
      .populate('authors')
      .populate('bookshops');
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { name, isbn, aisle, authors, bookshops } = req.body;
  try {
    const book = await Book.create({
      name,
      isbn,
      aisle,
      authors: Array.isArray(authors) ? authors : [authors],
      bookshops: Array.isArray(bookshops) ? bookshops : [bookshops]
    });

    const populatedBook = await Book.findById(book._id)
      .populate('authors')
      .populate('bookshops');

    res.status(201).json(populatedBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to create book", error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, isbn, aisle, authorIds } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      {
        name,
        isbn,
        aisle,
        authors: authorIds
      },
      { new: true }
    ).populate('authors')
     .populate('bookshops');

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(404).json({ message: "Failed to update book", error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Remove book reference from authors and bookshops
    await Author.updateMany(
      { books: id },
      { $pull: { books: id } }
    );

    await Bookshop.updateMany(
      { books: id },
      { $pull: { books: id } }
    );

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Failed to delete book", error: error.message });
  }
}; 