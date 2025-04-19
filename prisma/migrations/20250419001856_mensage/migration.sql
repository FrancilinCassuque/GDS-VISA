-- CreateTable
CREATE TABLE "ContactoGeral" (
    "id" TEXT NOT NULL,
    "contatoid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "servico" TEXT NOT NULL,

    CONSTRAINT "ContactoGeral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactoGeral_email_key" ON "ContactoGeral"("email");

-- CreateIndex
CREATE INDEX "ContactoGeral_contatoid_idx" ON "ContactoGeral"("contatoid");
