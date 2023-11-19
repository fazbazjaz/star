import { database } from "../database/connection";
import { users } from "../database/schema";

export class UsersHelper {}

export async function getAllUser() {
  return await database.select().from(users);
}

export async function createUser(props: object) {
  await database.insert(users).values(props).returning({ id: users.id });
}

export async function truncateUsers() {
  await database.delete(users);
}
