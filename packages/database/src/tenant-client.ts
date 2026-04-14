import { PrismaClient } from '@prisma/client';
import { prisma } from './index';

/**
 * Execute a database operation within a tenant-scoped transaction.
 * Sets PostgreSQL RLS context so all queries are automatically filtered by tenant.
 */
export async function withTenant<T>(
  tenantId: string,
  fn: (tx: PrismaClient) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    // Set the tenant context for RLS policies
    await tx.$executeRawUnsafe(`SET LOCAL app.current_tenant_id = '${tenantId}'`);
    return fn(tx as unknown as PrismaClient);
  });
}
