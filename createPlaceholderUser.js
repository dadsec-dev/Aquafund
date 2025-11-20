import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      wallet: 'cmhm66ndd0000gk0nn2sdjxa9',
      // add any other required fields with placeholders
      name: 'Placeholder User',
      email: 'placeholder@example.com',
    },
  });

  console.log("Placeholder user created.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
