const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // إنشاء مؤلف
  const author = await prisma.author.create({
    data: {
      name: "Ahmed Khaled",
      books: {
        create: [
          {
            name: "Book One",
            isbn: "ISBN-001",
            aisle: "A1",
          },
          {
            name: "Book Two",
            isbn: "ISBN-002",
            aisle: "B2",
          },
        ],
      },
    },
  });

  console.log("Seeded author with books:", author);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
