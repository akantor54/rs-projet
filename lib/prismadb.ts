import { PrismaClient } from "@prisma/client";

let prismadb: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismadb = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prismadb = globalWithPrisma.prisma;
}

export default prismadb;
