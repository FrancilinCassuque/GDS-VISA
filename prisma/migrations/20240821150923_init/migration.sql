-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT DEFAULT '',
    "nome" TEXT NOT NULL,
    "pais" TEXT DEFAULT 'Angola',
    "genero" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "Apelido" TEXT NOT NULL,
    "pessoatipo" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identidade" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Identidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocupacao" (
    "id" SERIAL NOT NULL,
    "ocupacao" VARCHAR(25) NOT NULL,
    "ocupante" VARCHAR(50) NOT NULL,
    "area" VARCHAR(50) NOT NULL,
    "remoneravel" BOOLEAN DEFAULT false,
    "valor" DECIMAL(65,30) DEFAULT 0.00,
    "desde" TIMESTAMP(3),
    "ate" TIMESTAMP(3),
    "profileId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ocupacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casa" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "published" BOOLEAN DEFAULT false,
    "quarto" VARCHAR(5) NOT NULL,
    "sala" VARCHAR(20) NOT NULL,
    "casadebanho" VARCHAR(20) NOT NULL,
    "cozinha" VARCHAR(20) NOT NULL,
    "quintal" VARCHAR(20) NOT NULL,
    "tipo" VARCHAR(30) NOT NULL,
    "descricao" TEXT DEFAULT '',
    "userId" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Casa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "rua" VARCHAR(50) NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "comuna" VARCHAR(50) NOT NULL,
    "municipio" VARCHAR(50) NOT NULL,
    "provincia" VARCHAR(50) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "casaId" TEXT,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Identidade_numero_key" ON "Identidade"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Identidade_profileId_key" ON "Identidade"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Ocupacao_profileId_key" ON "Ocupacao"("profileId");

-- CreateIndex
CREATE INDEX "Ocupacao_profileId_idx" ON "Ocupacao"("profileId");

-- CreateIndex
CREATE INDEX "Casa_userId_idx" ON "Casa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_casaId_key" ON "Address"("casaId");

-- CreateIndex
CREATE INDEX "Address_casaId_idx" ON "Address"("casaId");

-- CreateIndex
CREATE INDEX "Address_profileId_idx" ON "Address"("profileId");
