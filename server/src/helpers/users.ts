import { database } from "../database/connection";
import { InsertUserType, users } from "../database/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return await database.select().from(users);
};

export const createUser = async (user: InsertUserType) => {
  return await database.insert(users).values(user).returning({ id: users.id });
};

export const findUserByGoogleId = async (userGoogleId: string) => {
  return await database
    .selectDistinct({ id: users.id })
    .from(users)
    .where(eq(users.google_id, userGoogleId))
    .limit(1);
};
