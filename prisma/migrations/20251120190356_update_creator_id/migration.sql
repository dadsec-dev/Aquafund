-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("wallet") ON DELETE CASCADE ON UPDATE CASCADE;
