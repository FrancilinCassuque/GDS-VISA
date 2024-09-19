-- CreateTable
CREATE TABLE "Factura" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "processosId" TEXT[],
    "estado" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "desconto" DECIMAL(65,30) NOT NULL,
    "valorApagar" DECIMAL(65,30) NOT NULL,
    "valorEmFalta" DECIMAL(65,30) NOT NULL,
    "agenteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Factura_clientId_idx" ON "Factura"("clientId");

-- CreateIndex
CREATE INDEX "Factura_agenteId_idx" ON "Factura"("agenteId");
