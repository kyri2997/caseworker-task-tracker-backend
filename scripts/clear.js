import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clear() {
  await prisma.task.deleteMany();
  console.log("All tasks deleted");
}

clear().finally(() => prisma.$disconnect());