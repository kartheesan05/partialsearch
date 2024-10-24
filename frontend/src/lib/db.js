import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 0,
});

export const db = {
  query: (text, params) => pool.query(text, params),
};
