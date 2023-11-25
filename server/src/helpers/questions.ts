import { database } from "../database/connection";
import { questions } from "../database/schema";
import { eq } from "drizzle-orm";

export const createQuestion = async (userId: number, question: string) => {
  return database.insert(questions).values({ userId, question }).returning();
};

export const getAllQuestions = async () => {
  return await database.select().from(questions);
};

export const deleteQuestions = async (questionIdNumber: number) => {
  await database.delete(questions).where(eq(questions.id, questionIdNumber));
};

export const getOneQuestion = async (questionId: number) => {
  return await database
    .select()
    .from(questions)
    .where(eq(questions.id, questionId));
};

export const getQuestionAndAllAnswers = async (questionId: number) => {
  return await database.query.questions.findMany({
    with: {
      answers: true
    },
    where: eq(questions.id, questionId)
  });
};
