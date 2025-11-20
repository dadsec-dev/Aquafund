import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const broken = await prisma.$queryRawUnsafe(`
    SELECT "creatorId"
    FROM "Project"
    WHERE "creatorId" NOT IN (SELECT wallet FROM "User");
  `);

  console.log("Broken creatorId values:", broken);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
