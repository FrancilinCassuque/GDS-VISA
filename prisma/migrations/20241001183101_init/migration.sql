/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Servico` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Servico_tipo_key";

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "nome" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Servico_nome_key" ON "Servico"("nome");
