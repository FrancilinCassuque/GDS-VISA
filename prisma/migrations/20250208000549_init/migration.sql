-- CreateTable
CREATE TABLE "Vencimento" (
    "id" SERIAL NOT NULL,
    "funcaoid" INTEGER NOT NULL,
    "base" INTEGER NOT NULL,

    CONSTRAINT "Vencimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abono" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "vencimentoid" INTEGER NOT NULL,

    CONSTRAINT "Abono_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vencimento_funcaoid_idx" ON "Vencimento"("funcaoid");

-- CreateIndex
CREATE INDEX "Abono_vencimentoid_idx" ON "Abono"("vencimentoid");
