/*
  Warnings:

  - Added the required column `priceRub` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "isLiquid" BOOLEAN,
ADD COLUMN     "priceRub" INTEGER NOT NULL;
