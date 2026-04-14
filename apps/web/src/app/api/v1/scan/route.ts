import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@welkyn/database';
import { scanRequestSchema } from '@welkyn/shared';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = (session.user as any).tenantId;
  const userId = (session.user as any).id;

  try {
    const body = await request.json();
    const parsed = scanRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Verify all credential IDs belong to this tenant
    const credentials = await prisma.cloudCredential.findMany({
      where: {
        id: { in: parsed.data.credentialIds },
        tenantId,
        status: 'VALID',
      },
    });

    if (credentials.length !== parsed.data.credentialIds.length) {
      return NextResponse.json(
        { error: 'One or more credentials are invalid or not found' },
        { status: 400 },
      );
    }

    // Create scan record
    const scan = await prisma.scan.create({
      data: {
        tenantId,
        triggeredBy: userId,
        providers: parsed.data.providers,
        status: 'QUEUED',
      },
    });

    // TODO: Enqueue BullMQ job for scan:collect
    // await scanQueue.add('collect', { scanId: scan.id, tenantId, credentialIds: parsed.data.credentialIds });

    return NextResponse.json(
      { scanId: scan.id, status: scan.status },
      { status: 201 },
    );
  } catch (error) {
    console.error('Scan trigger error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = (session.user as any).tenantId;

  const scans = await prisma.scan.findMany({
    where: { tenantId },
    select: {
      id: true,
      status: true,
      providers: true,
      progress: true,
      startedAt: true,
      completedAt: true,
      createdAt: true,
      _count: { select: { findings: true, reports: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json({ scans });
}
