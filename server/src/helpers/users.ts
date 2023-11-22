import { database } from "../database/connection";
import { users, InsertUserType, SelectUserType } from "../database/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return await database.select().from(users);
};

export const createUser = async (user: InsertUserType) => {
  return await database.insert(users).values(user).returning();
};

// export const findUserByGoogleId = async (userGoogleId: string) => {
//   return await database
//     .selectDistinct({ id: users.id })
//     .from(users)
//     .where(eq(users.google_id, userGoogleId))
//     .limit(1);
// };

export const findUserById = async (userId: SelectUserType["id"]) => {
  return await database.select().from(users).where(eq(users.id, userId));
};
