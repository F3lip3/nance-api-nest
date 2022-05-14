/*
  Warnings:

  - You are about to drop the column `removed_at` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `removed_at` on the `Symbol` table. All the data in the column will be lost.
  - You are about to drop the column `removed_at` on the `SymbolCategory` table. All the data in the column will be lost.
  - You are about to drop the column `removed_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "removed_at";

-- AlterTable
ALTER TABLE "Symbol" DROP COLUMN "removed_at";

-- AlterTable
ALTER TABLE "SymbolCategory" DROP COLUMN "removed_at";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "removed_at";
