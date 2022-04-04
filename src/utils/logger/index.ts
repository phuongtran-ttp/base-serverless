import pino from 'pino';

export const logger = pino({
  name: process.env.app__APP_ID || 'crypto-badge',
  level: process.env.app__LOG_LEVEL || 'trace',
});