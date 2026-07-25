import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const mockPrisma = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (prop === "$connect" || prop === "$disconnect") return async () => {};
      if (prop === "$transaction") return async (args: any) => args;

      return new Proxy(
        {},
        {
          get: (modelTarget, method) => {
            return async () => {
              if (method === "count") return 0;
              if (method === "findMany") return [];
              return null;
            };
          },
        }
      );
    },
  }
) as PrismaClient;

export const prisma = process.env.DATABASE_URL
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : mockPrisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma as any;
