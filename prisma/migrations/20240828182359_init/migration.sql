-- DropIndex
DROP INDEX "Profile_userId_key";

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");
