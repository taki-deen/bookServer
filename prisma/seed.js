const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: "Ahmed Khaled",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "Naguib Mahfouz",
    },
  });

  const author3 = await prisma.author.create({
    data: {
      name: "Taha Hussein",
    },
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      name: "The Journey",
      isbn: "ISBN-001",
      aisle: "A1",
      authors: {
        connect: [{ id: author1.id }, { id: author2.id }]
      }
    },
  });

  const book2 = await prisma.book.create({
    data: {
      name: "Palace Walk",
      isbn: "ISBN-002",
      aisle: "B2",
      authors: {
        connect: [{ id: author2.id }]
      }
    },
  });

  const book3 = await prisma.book.create({
    data: {
      name: "The Days",
      isbn: "ISBN-003",
      aisle: "C3",
      authors: {
        connect: [{ id: author3.id }, { id: author1.id }]
      }
    },
  });

  // Create bookshops
  const bookshop1 = await prisma.bookshop.create({
    data: {
      name: "Central Bookstore",
      address: "123 Main St, Cairo",
      books: {
        connect: [{ id: book1.id }, { id: book2.id }]
      }
    },
  });

  const bookshop2 = await prisma.bookshop.create({
    data: {
      name: "Readers Corner",
      address: "456 Nile St, Alexandria",
      books: {
        connect: [{ id: book2.id }, { id: book3.id }]
      }
    },
  });

  const bookshop3 = await prisma.bookshop.create({
    data: {
      name: "Book World",
      address: "789 Pyramid Ave, Giza",
      books: {
        connect: [{ id: book1.id }, { id: book3.id }]
      }
    },
  });

  console.log("Seeded data successfully!");
  console.log("Authors:", { author1, author2, author3 });
  console.log("Books:", { book1, book2, book3 });
  console.log("Bookshops:", { bookshop1, bookshop2, bookshop3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
