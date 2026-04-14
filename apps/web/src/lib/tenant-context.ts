import { prisma } from '@welkyn/database';
import type { BrandingConfig } from '@welkyn/shared';

export interface TenantContext {
  id: string;
  name: string;
  slug: string;
  plan: string;
  branding: BrandingConfig | null;
}

export async function resolveTenant(slug: string): Promise<TenantContext | null> {
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      plan: true,
      brandingConfig: true,
    },
  });

  if (!tenant) return null;

  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    plan: tenant.plan,
    branding: tenant.brandingConfig as BrandingConfig | null,
  };
}

export async function resolveTenantByDomain(domain: string): Promise<TenantContext | null> {
  const tenant = await prisma.tenant.findUnique({
    where: { customDomain: domain },
    select: {
      id: true,
      name: true,
      slug: true,
      plan: true,
      brandingConfig: true,
    },
  });

  if (!tenant) return null;

  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    plan: tenant.plan,
    branding: tenant.brandingConfig as BrandingConfig | null,
  };
}
