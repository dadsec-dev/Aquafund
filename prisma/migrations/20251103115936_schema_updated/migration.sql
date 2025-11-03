/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AnalyticsCache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evidence` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[wallet]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'NGO');

-- DropForeignKey
ALTER TABLE "public"."Donation" DROP CONSTRAINT "Donation_donorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Donation" DROP CONSTRAINT "Donation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Evidence" DROP CONSTRAINT "Evidence_projectId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "wallet" TEXT;

-- DropTable
DROP TABLE "public"."AnalyticsCache";

-- DropTable
DROP TABLE "public"."Donation";

-- DropTable
DROP TABLE "public"."Evidence";

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");
