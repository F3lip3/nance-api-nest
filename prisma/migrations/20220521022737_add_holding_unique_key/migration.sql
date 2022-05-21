/*
  Warnings:

  - A unique constraint covering the columns `[portfolio_id,symbol_id]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Holding_portfolio_id_symbol_id_key" ON "Holding"("portfolio_id", "symbol_id");
