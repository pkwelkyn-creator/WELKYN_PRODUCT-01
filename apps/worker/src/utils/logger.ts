import pino from 'pino';

export const logger = pino({
  name: 'welkyn-worker',
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.APP_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});
