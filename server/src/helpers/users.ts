import { database } from "../database/connection";
import { users, InsertUserType, SelectUserType } from "../database/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return await database.select().from(users);
};

export const getUserById = async (userId: SelectUserType["id"]) => {
  return await database.select().from(users).where(eq(users.id, userId));
};

export const getUserByGoogleId = async (
  userGoogleId: SelectUserType["google_id"]
) => {
  return await database
    .select({ id: users.id })
    .from(users)
    .where(eq(users.google_id, userGoogleId));
};

export const createUser = async (user: InsertUserType) => {
  return await database.insert(users).values(user).returning();
};
