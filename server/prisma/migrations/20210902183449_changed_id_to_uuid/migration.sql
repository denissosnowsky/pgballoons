/*
  Warnings:

  - The primary key for the `Balloon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Bouquet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Balloon" DROP CONSTRAINT "Balloon_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Balloon_id_seq";

-- AlterTable
ALTER TABLE "Bouquet" DROP CONSTRAINT "Bouquet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Bouquet_id_seq";
