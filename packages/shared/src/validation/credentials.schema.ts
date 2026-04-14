import { z } from 'zod';

export const awsCredentialSchema = z.object({
  provider: z.literal('AWS'),
  label: z.string().min(1).max(100),
  accessLevel: z.enum(['READ_ONLY', 'PRIVILEGED']).default('READ_ONLY'),
  credentials: z.union([
    z.object({
      type: z.literal('role'),
      roleArn: z
        .string()
        .regex(/^arn:aws:iam::\d{12}:role\/[\w+=,.@-]+$/, 'Invalid IAM role ARN'),
      externalId: z.string().optional(),
    }),
    z.object({
      type: z.literal('access_key'),
      accessKeyId: z.string().regex(/^AKIA[0-9A-Z]{16}$/, 'Invalid AWS access key ID'),
      secretAccessKey: z.string().min(1),
      region: z.string().default('us-east-1'),
    }),
  ]),
});

export const azureCredentialSchema = z.object({
  provider: z.literal('AZURE'),
  label: z.string().min(1).max(100),
  accessLevel: z.enum(['READ_ONLY', 'PRIVILEGED']).default('READ_ONLY'),
  credentials: z.object({
    tenantId: z.string().uuid(),
    clientId: z.string().uuid(),
    clientSecret: z.string().min(1),
    subscriptionId: z.string().uuid(),
  }),
});

export const gcpCredentialSchema = z.object({
  provider: z.literal('GCP'),
  label: z.string().min(1).max(100),
  accessLevel: z.enum(['READ_ONLY', 'PRIVILEGED']).default('READ_ONLY'),
  credentials: z.object({
    type: z.literal('service_account'),
    projectId: z.string().min(1),
    serviceAccountKey: z.string().min(1),
  }),
});

export const cloudflareCredentialSchema = z.object({
  provider: z.literal('CLOUDFLARE'),
  label: z.string().min(1).max(100),
  accessLevel: z.enum(['READ_ONLY', 'PRIVILEGED']).default('READ_ONLY'),
  credentials: z.object({
    apiToken: z.string().min(1),
  }),
});

export const credentialSchema = z.discriminatedUnion('provider', [
  awsCredentialSchema,
  azureCredentialSchema,
  gcpCredentialSchema,
  cloudflareCredentialSchema,
]);

export type AwsCredentialInput = z.infer<typeof awsCredentialSchema>;
export type AzureCredentialInput = z.infer<typeof azureCredentialSchema>;
export type GcpCredentialInput = z.infer<typeof gcpCredentialSchema>;
export type CloudflareCredentialInput = z.infer<typeof cloudflareCredentialSchema>;
export type CredentialInput = z.infer<typeof credentialSchema>;
