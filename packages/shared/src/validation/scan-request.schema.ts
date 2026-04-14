import { z } from 'zod';

export const scanRequestSchema = z.object({
  providers: z
    .array(z.enum(['AWS', 'AZURE', 'GCP', 'CLOUDFLARE']))
    .min(1, 'At least one provider must be selected'),
  credentialIds: z
    .array(z.string().uuid())
    .min(1, 'At least one credential must be provided'),
});

export type ScanRequestInput = z.infer<typeof scanRequestSchema>;
