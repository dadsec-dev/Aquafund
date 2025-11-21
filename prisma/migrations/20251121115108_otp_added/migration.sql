/*
  Warnings:

  - You are about to drop the column `companyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ngoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateEnum
CREATE TYPE "NGOStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_creatorId_fkey";

-- DropIndex
DROP INDEX "public"."User_wallet_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyName",
DROP COLUMN "name",
DROP COLUMN "wallet",
ADD COLUMN     "ngoId" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "NGO" (
    "id" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "yearEstablished" INTEGER NOT NULL,
    "countryOfOperation" TEXT NOT NULL,
    "ngoIdentificationNumber" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "missionStatement" TEXT NOT NULL,
    "websiteOrSocialLinks" TEXT NOT NULL,
    "contactPersonName" TEXT,
    "contactPersonPosition" TEXT,
    "contactPersonPhoneNumber" TEXT,
    "contactPersonResidentialAddress" TEXT,
    "contactPersonEmailAddress" TEXT,
    "orgCountryOfOperation" TEXT,
    "orgEmailAddress" TEXT,
    "connectedWallet" TEXT,
    "statusVerification" "NGOStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,

    CONSTRAINT "NGO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NGO_userId_key" ON "NGO"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_ngoId_key" ON "User"("ngoId");

-- AddForeignKey
ALTER TABLE "NGO" ADD CONSTRAINT "NGO_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "NGO"("id") ON DELETE CASCADE ON UPDATE CASCADE;
