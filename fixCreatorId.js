import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Placeholder wallet for missing users
  const placeholderWallet = 'cmhm66ndd0000gk0nn2sdjxa9';

  // Get all projects
  const projects = await prisma.project.findMany();

  for (const project of projects) {
    // Check if creatorId matches a User wallet
    const userWithWallet = await prisma.user.findFirst({
      where: { wallet: project.creatorId },
    });

    if (!userWithWallet) {
      // Try to find the user by old ID
      const oldUser = await prisma.user.findUnique({
        where: { id: project.creatorId },
      });

      if (oldUser && oldUser.wallet) {
        // Update project to point to user's wallet
        await prisma.project.update({
          where: { id: project.id },
          data: { creatorId: oldUser.wallet },
        });
      } else {
        // Assign placeholder wallet
        await prisma.project.update({
          where: { id: project.id },
          data: { creatorId: placeholderWallet },
        });
      }
    }
  }

  console.log("All Project.creatorId values are now valid wallets.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
