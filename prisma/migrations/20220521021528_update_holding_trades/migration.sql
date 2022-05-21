/*
  Warnings:

  - You are about to drop the column `shares` on the `Holding` table. All the data in the column will be lost.
  - Added the required column `trades` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "shares",
ADD COLUMN     "trades" INTEGER NOT NULL;
