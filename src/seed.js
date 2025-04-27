const mongoose = require('mongoose');
require('dotenv').config();
const { Author, Book, Bookshop } = require('./models');

// Sample data
const authors = [
  { name: 'J.K. Rowling' },
  { name: 'George R.R. Martin' },
  { name: 'Stephen King' },
  { name: 'Agatha Christie' }
];

const books = [
  {
    name: 'Harry Potter and the Philosopher\'s Stone',
    isbn: '9780747532743',
    aisle: 'Fiction-A1'
  },
  {
    name: 'A Game of Thrones',
    isbn: '9780553103540',
    aisle: 'Fiction-B2'
  },
  {
    name: 'The Shining',
    isbn: '9780385121675',
    aisle: 'Horror-C1'
  },
  {
    name: 'Murder on the Orient Express',
    isbn: '9780062073495',
    aisle: 'Mystery-D1'
  }
];

const bookshops = [
  {
    name: 'Central Bookstore',
    address: '123 Main Street, New York, NY'
  },
  {
    name: 'Downtown Books',
    address: '456 Market Street, San Francisco, CA'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Author.deleteMany({});
    await Book.deleteMany({});
    await Bookshop.deleteMany({});
    console.log('Cleared existing data');

    // Insert authors
    const insertedAuthors = await Author.insertMany(authors);
    console.log('Inserted authors');

    // Insert books with author references
    const booksWithAuthors = books.map((book, index) => ({
      ...book,
      authors: [insertedAuthors[index]._id]
    }));
    const insertedBooks = await Book.insertMany(booksWithAuthors);
    console.log('Inserted books');

    // Insert bookshops with book references
    const bookshopsWithBooks = bookshops.map((bookshop, index) => ({
      ...bookshop,
      books: [insertedBooks[index]._id, insertedBooks[index + 1]._id]
    }));
    await Bookshop.insertMany(bookshopsWithBooks);
    console.log('Inserted bookshops');

    // Update books with bookshop references
    for (let i = 0; i < insertedBooks.length; i++) {
      const bookshopIndex = Math.floor(i / 2);
      await Book.findByIdAndUpdate(
        insertedBooks[i]._id,
        { $push: { bookshops: bookshopsWithBooks[bookshopIndex]._id } }
      );
    }
    console.log('Updated books with bookshop references');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedDatabase(); 