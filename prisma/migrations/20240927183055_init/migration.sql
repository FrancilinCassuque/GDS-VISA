-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servico_tipo_key" ON "Servico"("tipo");

-- CreateIndex
CREATE INDEX "Servico_userId_idx" ON "Servico"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_telefone_key" ON "Contacto"("telefone");
