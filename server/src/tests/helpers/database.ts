import { pool } from "../../database/connection";

export async function disconnectFromDatabase() {
  await pool.end();
}
