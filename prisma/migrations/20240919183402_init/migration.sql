/*
  Warnings:

  - The `processosId` column on the `Factura` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Factura" DROP COLUMN "processosId",
ADD COLUMN     "processosId" INTEGER[];
