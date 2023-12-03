import type { Config } from "drizzle-kit";

export default {
  // the location of the schema file
  schema: "./src/database/schema.ts",
  // the directory to output the migrations to
  out: "./src/database/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string
    // connectionString: process.env.DATABASE_CONNECTION_STRING
  }
} satisfies Config;
