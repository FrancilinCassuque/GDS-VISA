/*
  Warnings:

  - You are about to alter the column `total` on the `Factura` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `desconto` on the `Factura` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `valorApagar` on the `Factura` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `valorEmFalta` on the `Factura` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Factura" ALTER COLUMN "total" SET DATA TYPE INTEGER,
ALTER COLUMN "desconto" SET DATA TYPE INTEGER,
ALTER COLUMN "valorApagar" SET DATA TYPE INTEGER,
ALTER COLUMN "valorEmFalta" SET DATA TYPE INTEGER;
