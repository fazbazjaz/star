import { migrate } from "drizzle-orm/node-postgres/migrator";
import { database } from "./connection";

async function applyMigration() {
  try {
    console.log(`Migration: Database: ${process.env.DATABASE_NAME}`);
    console.log("➡️ Migration: Applying Migration...");
    const start = Date.now();
    // we call the migrate function from drizzle and have to pass in:
    // [1] the database connection, [2] an object with the migrations folder path
    await migrate(database, { migrationsFolder: "src/database/migrations" });
    const end = Date.now();
    console.log(`✅ Migration: Migration Completed in ${end - start}ms`);
    process.exit(0);
  } catch (error) {
    console.log("❌ Migration: Migration Failed");
    console.error(error);
    process.exit(1);
  }
}

applyMigration();
