import { pool } from "../../database/connection";

export const disconnectFromDatabase = async () => {
  await pool.end();
};
