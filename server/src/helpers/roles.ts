import { database } from "../database/connection";
import { roles } from "../database/schema";

export const getAllRoles = async () => {
  return await database.select().from(roles);
};

export const createRole = async (role: string) => {
  return await database.insert(roles).values({ role }).returning();
};
