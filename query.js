const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.findMany({
    select: { name: true, streams: true }
  });
  console.log(JSON.stringify(colleges, null, 2));
}

main().finally(() => prisma.$disconnect());
