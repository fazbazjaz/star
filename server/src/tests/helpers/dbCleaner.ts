import { database } from "../../database/connection";
import { sql } from "drizzle-orm";

export const deleteAllQuestions = async () => {
  await database.execute(sql`truncate questions cascade;`);
};

export const deleteAllUsers = async () => {
  await database.execute(sql`truncate users cascade;`);
};

export const cleanAll = async () => {
  await deleteAllQuestions();
  await deleteAllUsers();
};
