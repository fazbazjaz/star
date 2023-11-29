import { database } from "../database/connection";
import { questions, answers, comments } from "../database/schema";
import { eq, and } from "drizzle-orm";

export const createQuestion = async (userId: number, question: string) => {
  return await database
    .insert(questions)
    .values({ userId, question })
    .returning();
};

export const createAnswer = async (
  userId: number,
  questionId: number,
  situation: string,
  task: string,
  action: string,
  result: string
) => {
  return await database
    .insert(answers)
    .values({ userId, questionId, situation, task, action, result })
    .returning();
};

export const createComment = async (
  userId: number,
  answerId: number,
  comment: string
) => {
  return await database
    .insert(comments)
    .values({ userId, answerId, comment })
    .returning();
};

export const getAllQuestions = async () => {
  return await database.select().from(questions);
};

export const getOneQuestion = async (questionId: number) => {
  return await database
    .select()
    .from(questions)
    .where(eq(questions.id, questionId));
};

export const getOneQuestionWithAnswers = async (questionId: number) => {
  return await database.query.questions.findMany({
    with: {
      answers: true
    },
    where: eq(questions.id, questionId)
  });
};

export const getOneQuestionWithAnswersAndComments = async (
  questionId: number
) => {
  return await database.query.questions.findMany({
    with: {
      answers: {
        with: {
          comments: true
        }
      }
    },
    where: eq(questions.id, questionId)
  });
};

export const getAllQuestionsByUser = async (userId: number) => {
  return await database
    .select()
    .from(questions)
    .where(eq(questions.userId, userId));
};

export const getAnswer = async (questionId: number, answerId: number) => {
  return await database
    .select()
    .from(questions)
    .innerJoin(answers, eq(questions.id, answers.questionId))
    .where(and(eq(questions.id, questionId), eq(answers.id, answerId)));
};

export const deleteQuestion = async (questionId: number) => {
  return await database
    .delete(questions)
    .where(eq(questions.id, questionId))
    .returning();
};

export const editQuestion = async (questionId: number, question: string) => {
  return await database
    .update(questions)
    .set({ question })
    .where(eq(questions.id, questionId))
    .returning();
};

export const deleteAnswer = async (questionId: number, answerId: number) => {
  return await database
    .delete(answers)
    .where(and(eq(answers.id, answerId), eq(answers.questionId, questionId)))
    .returning();
};
