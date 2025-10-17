import dotenv from 'dotenv'
import pg from 'pg'


dotenv.config()

const { Pool } = pg


const db = new Pool({
    user: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    database: process.env.DEV_DB_NAME,
});

const originalQuery = db.query;
db.query = async function (...args) {
  const dbStart = performance.now();
  const result = await originalQuery.apply(this, args);
  const duration = performance.now() - dbStart;
  if (duration > 100) {
    console.warn(` Slow query (${duration.toFixed(2)} ms): ${args[0]}`);
  }
  console.log(`Query took ${duration} ms -> ${args[0]}`);
  return result;
};






export default db
