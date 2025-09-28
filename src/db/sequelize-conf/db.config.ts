import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './db.interface';

dotenv.config();

export const dataBaseConfig: IDatabaseConfig = {
  dev: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING,
    schema: process.env.DB_SCHEMA || 'public',
    sync: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    timezone: process.env.DB_TIMEZONE || 'Asia/Ashgabat',
  },
  prod: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING,
    schema: process.env.DB_SCHEMA || 'public',
    sync: Boolean(process.env.DB_SYNCHRONIZE) || false,
    timezone: process.env.DB_TIMEZONE || 'Asia/Ashgabat',
  },
};
