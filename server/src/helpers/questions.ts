import { database } from "../database/connection";
import { questions } from "../database/schema";

export const createQuestion = async (userId: number, question: string) => {
  return database.insert(questions).values({ userId, question }).returning();
};

export const getAllQuestions = async () => {
  return await database.select().from(questions);
};
