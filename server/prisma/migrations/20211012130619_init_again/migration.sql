-- DropForeignKey
ALTER TABLE "Balloon" DROP CONSTRAINT "Balloon_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Balloon" DROP CONSTRAINT "Balloon_colorId_fkey";

-- AddForeignKey
ALTER TABLE "Balloon" ADD CONSTRAINT "Balloon_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balloon" ADD CONSTRAINT "Balloon_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Assortment.name_unique" RENAME TO "Assortment_name_key";

-- RenameIndex
ALTER INDEX "Balloon.code_unique" RENAME TO "Balloon_code_key";

-- RenameIndex
ALTER INDEX "Bouquet.code_unique" RENAME TO "Bouquet_code_key";

-- RenameIndex
ALTER INDEX "Category.name_unique" RENAME TO "Category_name_key";

-- RenameIndex
ALTER INDEX "Color.cssName_unique" RENAME TO "Color_cssName_key";

-- RenameIndex
ALTER INDEX "Color.name_unique" RENAME TO "Color_name_key";
