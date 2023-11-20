import { database } from "../../database/connection";
import { users, InsertUserType } from "../../database/schema";

export const getAllUsers = async () => {
  return await database.select().from(users);
};

export const createUser = async (user: InsertUserType) => {
  await database.insert(users).values(user).returning({ id: users.id });
};

export const deleteAllUsers = async () => {
  await database.delete(users);
};
