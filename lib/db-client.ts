import { PrismaClient } from '@/lib/generated/prisma/client';

const globalDbClient = globalThis as unknown as {
  prisma: PrismaClient;
};

const prisma = globalDbClient.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalDbClient.prisma = prisma;

export { prisma };
