const { Bookshop, Book } = require('../models');

// Get all bookshops
exports.getAllBookshops = async (req, res) => {
  try {
    const bookshops = await Bookshop.find().populate('books');
    res.json(bookshops);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookshops", error: error.message });
  }
};

// Get bookshop by ID
exports.getBookshopById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookshop = await Bookshop.findById(id).populate('books');
    if (!bookshop) {
      return res.status(404).json({ message: "Bookshop not found" });
    }
    res.json(bookshop);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookshop", error: error.message });
  }
};

// Create a new bookshop
exports.createBookshop = async (req, res) => {
  const { name, address, bookIds } = req.body;
  try {
    const bookshop = await Bookshop.create({
      name,
      address,
      books: bookIds
    });

    const populatedBookshop = await Bookshop.findById(bookshop._id).populate('books');
    res.status(201).json(populatedBookshop);
  } catch (error) {
    res.status(400).json({ message: "Failed to create bookshop", error: error.message });
  }
};

// Update a bookshop
exports.updateBookshop = async (req, res) => {
  const { id } = req.params;
  const { name, address, bookIds } = req.body;
  try {
    const bookshop = await Bookshop.findByIdAndUpdate(
      id,
      {
        name,
        address,
        books: bookIds
      },
      { new: true }
    ).populate('books');

    if (!bookshop) {
      return res.status(404).json({ message: "Bookshop not found" });
    }

    res.json(bookshop);
  } catch (error) {
    res.status(404).json({ message: "Failed to update bookshop", error: error.message });
  }
};

// Delete a bookshop
exports.deleteBookshop = async (req, res) => {
  const { id } = req.params;
  try {
    const bookshop = await Bookshop.findByIdAndDelete(id);
    
    if (!bookshop) {
      return res.status(404).json({ message: "Bookshop not found" });
    }

    // Remove bookshop reference from books
    await Book.updateMany(
      { bookshops: id },
      { $pull: { bookshops: id } }
    );

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Failed to delete bookshop", error: error.message });
  }
}; 