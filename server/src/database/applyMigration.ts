import { migrate } from "drizzle-orm/postgres-js/migrator";
import { database } from "./connection";

async function applyMigration() {
  try {
    console.log("➡️ Applying Migration...");
    const start = Date.now();
    // we call the migrate function from drizzle and have to pass in:
    // [1] the database connection, [2] an object with the migrations folder path
    await migrate(database, { migrationsFolder: "src/database/migrations" });
    const end = Date.now();
    console.log(`✅ Migration Completed in ${end - start}ms`);
    process.exit(0);
  } catch (error) {
    console.log("❌ Migration Failed");
    console.error(error);
    process.exit(1);
  }
}

applyMigration();
