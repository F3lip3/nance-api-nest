/*
  Warnings:

  - You are about to drop the column `category_id` on the `Symbol` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Symbol` table. All the data in the column will be lost.
  - You are about to drop the `SymbolCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exchange` to the `Symbol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Symbol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longname` to the `Symbol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Symbol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortname` to the `Symbol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Symbol` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Symbol" DROP CONSTRAINT "Symbol_category_id_fkey";

-- AlterTable
ALTER TABLE "Symbol" DROP COLUMN "category_id",
DROP COLUMN "name",
ADD COLUMN     "exchange" VARCHAR(10) NOT NULL,
ADD COLUMN     "industry" VARCHAR(1000) NOT NULL,
ADD COLUMN     "longname" TEXT NOT NULL,
ADD COLUMN     "sector" VARCHAR(500) NOT NULL,
ADD COLUMN     "shortname" VARCHAR(500) NOT NULL,
ADD COLUMN     "type" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "SymbolCategory";
