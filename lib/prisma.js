import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { Pool } from "pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionStr = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_TPHs3Ad5qhne@ep-restless-butterfly-amhl3k1h-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  const pool = new Pool({ connectionString: connectionStr });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
