import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { STORFRONT_HOST, STOREFRONT_USER, STOREFRONT_PASSWORD, STOREFRONT_DB, ENV } =
  process.env;

const client = new Pool({
  host: STORFRONT_HOST,
  user: STOREFRONT_USER,
  password: STOREFRONT_PASSWORD,
  database: ENV === 'dev' ? STOREFRONT_DB : STOREFRONT_DB,
});

export default client;
