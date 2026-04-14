import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@welkyn/database';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, company, email, password } = parsed.data;

    // Generate slug from company name
    const slug = company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if tenant slug or user email already exists
    const existingTenant = await prisma.tenant.findUnique({ where: { slug } });
    if (existingTenant) {
      return NextResponse.json({ error: 'Company name already taken' }, { status: 409 });
    }

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Create tenant and owner user atomically
    const passwordHash = await hash(password, 10);

    const tenant = await prisma.tenant.create({
      data: {
        name: company,
        slug,
        plan: 'FREE',
        brandingConfig: {
          primaryColor: '#0066FF',
          secondaryColor: '#1A1A2E',
          companyName: company,
        },
        users: {
          create: {
            email,
            name,
            passwordHash,
            role: 'OWNER',
          },
        },
      },
      include: { users: true },
    });

    return NextResponse.json(
      { message: 'Account created', tenantSlug: tenant.slug },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
