import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { logger } from './utils/logger';
import { handleCollectJob } from './queues/scan.queue';
import { handleReportJob } from './queues/report.queue';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

logger.info('WELKYN Worker starting...');

// Scan collection worker
const scanWorker = new Worker(
  'scan:collect',
  async (job) => {
    logger.info({ jobId: job.id, data: job.data }, 'Processing scan:collect job');
    await handleCollectJob(job);
  },
  { connection, concurrency: 3 },
);

// Scan analysis worker
const analyzeWorker = new Worker(
  'scan:analyze',
  async (job) => {
    logger.info({ jobId: job.id, data: job.data }, 'Processing scan:analyze job');
    // TODO: Implement analysis pipeline
  },
  { connection, concurrency: 2 },
);

// Report generation worker
const reportWorker = new Worker(
  'report:generate',
  async (job) => {
    logger.info({ jobId: job.id, data: job.data }, 'Processing report:generate job');
    await handleReportJob(job);
  },
  { connection, concurrency: 2 },
);

// Graceful shutdown
function shutdown() {
  logger.info('Shutting down workers...');
  Promise.all([scanWorker.close(), analyzeWorker.close(), reportWorker.close()]).then(() => {
    connection.disconnect();
    logger.info('Workers shut down.');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Error handlers
[scanWorker, analyzeWorker, reportWorker].forEach((worker) => {
  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, error: err.message }, 'Job failed');
  });
  worker.on('completed', (job) => {
    logger.info({ jobId: job.id }, 'Job completed');
  });
});

logger.info('WELKYN Worker ready. Listening for jobs...');
