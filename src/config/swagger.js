const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
      description: 'API for managing books, authors, and bookshops',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['name', 'isbn', 'aisle'],
          properties: {
            _id: { type: 'string', description: 'Book ID' },
            name: { type: 'string', description: 'Book name' },
            isbn: { type: 'string', description: 'ISBN number' },
            aisle: { type: 'string', description: 'Aisle location' },
            authors: { 
              type: 'array',
              items: { 
                type: 'string',
                description: 'Author ID'
              }
            },
            bookshops: { 
              type: 'array',
              items: { 
                type: 'string',
                description: 'Bookshop ID'
              }
            }
          }
        },
        Author: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: { type: 'string', description: 'Author ID' },
            name: { type: 'string', description: 'Author name' },
            books: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Book ID'
              }
            }
          }
        },
        Bookshop: {
          type: 'object',
          required: ['name', 'address'],
          properties: {
            _id: { type: 'string', description: 'Bookshop ID' },
            name: { type: 'string', description: 'Bookshop name' },
            address: { type: 'string', description: 'Bookshop address' },
            books: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Book ID'
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            error: { type: 'string', description: 'Error details' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs; 