import { PrismaClient, Plan, UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      id: randomUUID(),
      name: 'Demo Company',
      slug: 'demo',
      plan: Plan.PRO,
      brandingConfig: {
        primaryColor: '#0066FF',
        secondaryColor: '#1A1A2E',
        companyName: 'Demo Company',
      },
    },
  });

  console.log(`Created tenant: ${tenant.name} (${tenant.slug})`);

  // Create demo user (password: "demo1234" — bcrypt hash)
  const user = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'admin@demo.welkyn.io' } },
    update: {},
    create: {
      id: randomUUID(),
      tenantId: tenant.id,
      email: 'admin@demo.welkyn.io',
      name: 'Demo Admin',
      // bcrypt hash of "demo1234"
      passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
      role: UserRole.OWNER,
    },
  });

  console.log(`Created user: ${user.email} (${user.role})`);

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
