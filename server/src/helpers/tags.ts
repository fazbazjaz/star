import { database } from "../database/connection";
import { tags } from "../database/schema";

export const getAllTags = async () => {
  return await database.select().from(tags);
};

export const createTag = async (tag: string) => {
  return await database.insert(tags).values({ tag });
};
