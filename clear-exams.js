const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.examEvent.deleteMany({});
  await prisma.exam.deleteMany({});
  console.log("Cleared legacy exams.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
