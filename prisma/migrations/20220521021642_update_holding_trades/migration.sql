/*
  Warnings:

  - You are about to drop the column `lots` on the `Holding` table. All the data in the column will be lost.
  - Added the required column `shares` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "lots",
ADD COLUMN     "shares" INTEGER NOT NULL;
