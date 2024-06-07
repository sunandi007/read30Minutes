/*
  Warnings:

  - You are about to drop the column `audioUrl` on the `bookaction` table. All the data in the column will be lost.
  - You are about to drop the column `signedAudioUrl` on the `bookaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookaction` DROP COLUMN `audioUrl`,
    DROP COLUMN `signedAudioUrl`,
    ADD COLUMN `content` VARCHAR(191) NULL,
    MODIFY `actionTitle` VARCHAR(191) NULL;
