import { database } from "../database/connection";
import { questions, answers, comments } from "../database/schema";
import { eq, and } from "drizzle-orm";

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

export const createQuestion = async (userId: number, question: string) => {
  return await database
    .insert(questions)
    .values({ userId, question })
    .returning();
};

export const editQuestion = async (questionId: number, question: string) => {
  return await database
    .update(questions)
    .set({ question, updatedAt: new Date(Date.now()) })
    .where(eq(questions.id, questionId))
    .returning();
};

export const deleteQuestion = async (questionId: number) => {
  return await database
    .delete(questions)
    .where(eq(questions.id, questionId))
    .returning();
};

export const getAnswer = async (questionId: number, answerId: number) => {
  return await database
    .select()
    .from(questions)
    .innerJoin(answers, eq(questions.id, answers.questionId))
    .where(and(eq(questions.id, questionId), eq(answers.id, answerId)));
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

export const editAnswer = async (
  questionId: number,
  answerId: number,
  situation: string,
  task: string,
  action: string,
  result: string
) => {
  return await database
    .update(answers)
    .set({ situation, task, action, result, updatedAt: new Date(Date.now()) })
    .where(and(eq(answers.questionId, questionId), eq(answers.id, answerId)))
    .returning();
};

export const deleteAnswer = async (questionId: number, answerId: number) => {
  return await database
    .delete(answers)
    .where(and(eq(answers.id, answerId), eq(answers.questionId, questionId)))
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

export const editComment = async (
  // questionId: number,
  answerId: number,
  commentId: number,
  comment: string
) => {
  return await database
    .update(comments)
    .set({ comment })
    .where(and(eq(comments.id, commentId), eq(comments.answerId, answerId)))
    .returning();
};

export const deleteComment = async (
  // questionId: number,
  answerId: number,
  commentId: number
) => {
  return await database
    .delete(comments)
    .where(and(eq(comments.id, commentId), eq(comments.answerId, answerId)))
    .returning();
};
