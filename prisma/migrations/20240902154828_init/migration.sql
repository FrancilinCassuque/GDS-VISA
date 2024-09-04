/*
  Warnings:

  - You are about to drop the column `ate` on the `Ocupacao` table. All the data in the column will be lost.
  - You are about to drop the column `desde` on the `Ocupacao` table. All the data in the column will be lost.
  - You are about to drop the column `remoneravel` on the `Ocupacao` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Ocupacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ocupacao" DROP COLUMN "ate",
DROP COLUMN "desde",
DROP COLUMN "remoneravel",
DROP COLUMN "valor",
ALTER COLUMN "ocupacao" SET DATA TYPE VARCHAR(35);
