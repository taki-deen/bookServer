/*
  Warnings:

  - You are about to drop the column `authorId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_authorId_fkey`;

-- DropIndex
DROP INDEX `Book_authorId_fkey` ON `book`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `authorId`;

-- CreateTable
CREATE TABLE `Bookshop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AuthorToBook` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AuthorToBook_AB_unique`(`A`, `B`),
    INDEX `_AuthorToBook_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BookToBookshop` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookToBookshop_AB_unique`(`A`, `B`),
    INDEX `_BookToBookshop_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AuthorToBook` ADD CONSTRAINT `_AuthorToBook_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuthorToBook` ADD CONSTRAINT `_AuthorToBook_B_fkey` FOREIGN KEY (`B`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToBookshop` ADD CONSTRAINT `_BookToBookshop_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookToBookshop` ADD CONSTRAINT `_BookToBookshop_B_fkey` FOREIGN KEY (`B`) REFERENCES `Bookshop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
