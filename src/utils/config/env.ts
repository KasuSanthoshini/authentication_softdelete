import { config } from 'dotenv';

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '4000',
  DB_NAME: process.env.DB_NAME || 'test',
  DATABASE_URL: process.env.DATABASE_URL!,
  USER_COLLECTION:'user',
  JWT_SECRET:`·process.env.JWT_SECRET`
};

/**
 * Validates the environment variables and throws an error if any are missing.
 */
(() => {
  const envVariables = Object.keys(env);

  // eslint-disable-next-line no-restricted-syntax
  for (const envVariable of envVariables) {
    // @ts-expect-error
    if (!env[envVariable]) throw new Error(`Environment variable ${envVariable} is missing!`);
  }
})();

export const testMongoConfig = {
  Memory: true,
  IP: '127.0.0.1',
  Port: '27017',
  Database: 'test',
};
