import * as dotenv from "dotenv";

dotenv.config();

// Database
export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'db';
export const POSTGRES_PORT = +process.env.POSTGRES_PORT || 5432;
export const POSTGRES_USERNAME = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
export const POSTGRES_DB = process.env.POSTGRES_DB || 'ecommerce';