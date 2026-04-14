import { Queue, Job } from 'bullmq';
import IORedis from 'ioredis';
import { logger } from '../utils/logger';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const scanQueue = new Queue('scan:collect', { connection });
export const analyzeQueue = new Queue('scan:analyze', { connection });

export interface ScanCollectJobData {
  scanId: string;
  tenantId: string;
  credentialIds: string[];
  providers: string[];
}

export async function handleCollectJob(job: Job<ScanCollectJobData>) {
  const { scanId, tenantId, providers } = job.data;

  logger.info({ scanId, tenantId, providers }, 'Starting data collection');

  // Update scan status to COLLECTING
  // TODO: prisma update scan status

  let progress = 0;
  const progressStep = Math.floor(100 / Math.max(providers.length, 1));

  for (const provider of providers) {
    logger.info({ scanId, provider }, `Collecting data for ${provider}`);

    // TODO: Run the appropriate collectors based on provider
    // switch (provider) {
    //   case 'AWS': await runAwsCollectors(tenantId, credentialId);
    //   case 'AZURE': await runAzureCollectors(tenantId, credentialId);
    //   case 'GCP': await runGcpCollectors(tenantId, credentialId);
    //   case 'CLOUDFLARE': await runCloudflareCollectors(tenantId, credentialId);
    // }

    progress += progressStep;
    await job.updateProgress(Math.min(progress, 100));
  }

  // Enqueue analysis job
  await analyzeQueue.add('analyze', { scanId, tenantId });

  logger.info({ scanId }, 'Data collection complete, analysis enqueued');
}
