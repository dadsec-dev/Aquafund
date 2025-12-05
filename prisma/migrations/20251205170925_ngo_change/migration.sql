/*
  Warnings:

  - You are about to drop the column `ngoId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."NGO_userId_key";

-- DropIndex
DROP INDEX "public"."User_ngoId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ngoId";
