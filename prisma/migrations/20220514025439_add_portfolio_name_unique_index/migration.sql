/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_name_user_id_key" ON "Portfolio"("name", "user_id");
