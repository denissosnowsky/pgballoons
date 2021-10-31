/*
  Warnings:

  - Changed the type of `price` on the `Balloon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `Bouquet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Balloon" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Bouquet" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
