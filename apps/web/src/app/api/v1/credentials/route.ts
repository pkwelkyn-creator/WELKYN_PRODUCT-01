import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@welkyn/database';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = (session.user as any).tenantId;

  const credentials = await prisma.cloudCredential.findMany({
    where: { tenantId },
    select: {
      id: true,
      provider: true,
      accessLevel: true,
      label: true,
      status: true,
      lastValidated: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ credentials });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = (session.user as any).tenantId;
  const role = (session.user as any).role;

  if (role === 'VIEWER') {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await request.json();

    // For now, store a placeholder. In production, this encrypts via the credential vault.
    const credential = await prisma.cloudCredential.create({
      data: {
        tenantId,
        provider: body.provider,
        accessLevel: body.accessLevel || 'READ_ONLY',
        label: body.label,
        encryptedData: Buffer.from('placeholder-encrypted'),
        dekEncrypted: Buffer.from('placeholder-dek'),
        status: 'PENDING_VALIDATION',
        metadata: body.metadata || {},
      },
    });

    return NextResponse.json(
      { id: credential.id, status: credential.status },
      { status: 201 },
    );
  } catch (error) {
    console.error('Credential creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
