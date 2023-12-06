import { database } from "../database/connection";
import { users, SelectUserType, InsertUserType } from "../database/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return await database.select().from(users);
};

export const getUserById = async (userId: SelectUserType["id"]) => {
  return await database.select().from(users).where(eq(users.id, userId));
};

export const getUserByGoogleId = async (
  userGoogleId: SelectUserType["googleId"]
) => {
  return await database
    .select()
    .from(users)
    .where(eq(users.googleId, userGoogleId));
};

export const createUser = async (user: InsertUserType) => {
  return await database.insert(users).values(user).returning();
};

export const updateUserRoleId = async (
  userGoogleId: string,
  roleId: number
) => {
  return await database
    .update(users)
    .set({ roleId: roleId })
    .where(eq(users.googleId, userGoogleId))
    .returning();
};
