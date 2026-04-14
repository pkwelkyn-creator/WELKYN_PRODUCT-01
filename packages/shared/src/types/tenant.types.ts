export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  faviconUrl?: string;
  companyName: string;
  emailFromName?: string;
}

export type PlanType = 'FREE' | 'PRO' | 'PREMIUM';
export type UserRoleType = 'OWNER' | 'ADMIN' | 'VIEWER';
export type CloudProviderType = 'AWS' | 'AZURE' | 'GCP' | 'CLOUDFLARE';
export type AccessLevelType = 'READ_ONLY' | 'PRIVILEGED';
