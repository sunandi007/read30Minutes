/*
  Warnings:

  - You are about to drop the column `slug` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `src2x` on the `image` table. All the data in the column will be lost.
  - You are about to drop the `source` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `source` DROP FOREIGN KEY `Source_imageId_fkey`;

-- DropIndex
DROP INDEX `Book_slug_key` ON `book`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `slug`,
    MODIFY `publishedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `image` DROP COLUMN `media`,
    DROP COLUMN `src`,
    DROP COLUMN `src2x`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `large` VARCHAR(191) NULL,
    ADD COLUMN `medium` VARCHAR(191) NULL,
    ADD COLUMN `original` VARCHAR(191) NULL,
    ADD COLUMN `small` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `source`;
