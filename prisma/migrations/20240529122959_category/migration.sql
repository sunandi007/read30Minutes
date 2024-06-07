/*
  Warnings:

  - You are about to drop the column `subtitle` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `category` table. All the data in the column will be lost.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `subtitle`,
    DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
