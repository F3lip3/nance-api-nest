/*
  Warnings:

  - You are about to drop the column `trades` on the `Holding` table. All the data in the column will be lost.
  - Added the required column `transactions` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "trades",
ADD COLUMN     "transactions" INTEGER NOT NULL;
