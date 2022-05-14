import { PrismaClient } from '@prisma/client';
import { seedCurrencies } from './seeds/currencies';

const prisma = new PrismaClient();

async function main() {
  await seedCurrencies(prisma);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
