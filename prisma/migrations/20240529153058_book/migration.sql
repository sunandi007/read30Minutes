/*
  Warnings:

  - You are about to drop the column `aboutTheAuthor` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `audioUrl` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `browseUrl` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `freeDaily` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `hasAudio` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `isAudio` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `mainColor` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `playUrl` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `previewUrl` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `sourceAuthor` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `truncatedAuthor` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `whoShouldRead` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `aboutTheAuthor`,
    DROP COLUMN `audioUrl`,
    DROP COLUMN `browseUrl`,
    DROP COLUMN `freeDaily`,
    DROP COLUMN `hasAudio`,
    DROP COLUMN `isAudio`,
    DROP COLUMN `isFree`,
    DROP COLUMN `language`,
    DROP COLUMN `mainColor`,
    DROP COLUMN `playUrl`,
    DROP COLUMN `previewUrl`,
    DROP COLUMN `sourceAuthor`,
    DROP COLUMN `textColor`,
    DROP COLUMN `truncatedAuthor`,
    DROP COLUMN `whoShouldRead`,
    MODIFY `url` VARCHAR(191) NULL,
    MODIFY `readUrl` VARCHAR(191) NULL,
    MODIFY `readingDuration` INTEGER NULL,
    MODIFY `minutesToRead` INTEGER NULL,
    MODIFY `publishedAt` DATETIME(3) NULL,
    MODIFY `averageRating` DOUBLE NULL,
    MODIFY `totalRatings` INTEGER NULL;
