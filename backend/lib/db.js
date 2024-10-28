const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 0,
});

module.exports = {
  db: {
    query: (text, params) => pool.query(text, params),
  }
};
