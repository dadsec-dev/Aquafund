/*
  Warnings:

  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nonce" TEXT,
ADD COLUMN     "nonceExpiresAt" TIMESTAMP(3),
ADD COLUMN     "nonceIssuedAt" TIMESTAMP(3),
ADD COLUMN     "walletAddress" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");
