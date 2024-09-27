/*
  Warnings:

  - Added the required column `tipo` to the `notificacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notificacao" ADD COLUMN     "tipo" TEXT NOT NULL;
