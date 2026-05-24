const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.review.findMany().then(console.log).catch(console.error).finally(() => prisma.$disconnect());
