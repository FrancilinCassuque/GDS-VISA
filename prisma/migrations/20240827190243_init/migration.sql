/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_profileId_key" ON "Address"("profileId");
