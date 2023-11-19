import dotenvFlow from 'dotenv-flow';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

dotenvFlow.config();

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionString: process.env.DATABASE_CONNECTION_STRING
});

export const database = drizzle(pool);

// These log messages about the Database Connection
pool.on("connect", () => {
  console.log("Database: Connection established with the Database");
});

pool.on("acquire", () => {
  console.log("Database: Connection acquired from the Pool");
});

pool.on("remove", () => {
  console.log("Database: Connection removed from the Pool");
});

pool.on("error", (error) => {
  console.log(
    "Database: Error occurred in a Connection from the Pool",
    error.message
  );
});
