/*
  Warnings:

  - You are about to drop the column `agenteId` on the `Factura` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Factura` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Factura_agenteId_idx";

-- AlterTable
ALTER TABLE "Factura" DROP COLUMN "agenteId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Factura_profileId_idx" ON "Factura"("profileId");
