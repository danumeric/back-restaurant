/*
  Warnings:

  - Made the column `priceRub` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_categoryId_fkey";

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "priceRub" SET NOT NULL;

-- CreateTable
CREATE TABLE "_CategoryToDish" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToDish_AB_unique" ON "_CategoryToDish"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToDish_B_index" ON "_CategoryToDish"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToDish" ADD CONSTRAINT "_CategoryToDish_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDish" ADD CONSTRAINT "_CategoryToDish_B_fkey" FOREIGN KEY ("B") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
