-- CreateTable
CREATE TABLE "notificacao" (
    "id" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "visto" BOOLEAN NOT NULL,

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id")
);
