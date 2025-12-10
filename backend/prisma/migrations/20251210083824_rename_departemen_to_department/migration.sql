/*
  Warnings:

  - You are about to drop the column `departement` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `departement`,
    ADD COLUMN `department` VARCHAR(191) NOT NULL DEFAULT 'General';
