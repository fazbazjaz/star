// version2 my code
import { database } from "../database/connection";
import { questions, answers, comments } from "../database/schema";
import { eq } from "drizzle-orm";

export const createQuestion = async (userId: number, question: string) => {
  return database.insert(questions).values({ userId, question }).returning();
};

export const getAllQuestionsByUser = async (userId?: number) => {
  const query = userId
    ? database.select().from(questions).where(eq(questions.userId, userId))
    : database.select().from(questions);

  return await query;
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

export const createAnswer = async (
  questionId: number,
  situation: string,
  task: string,
  action: string,
  result: string
) => {
  return database
    .insert(answers)
    .values({ questionId, situation, task, action, result })
    .returning();
};

export const createComment = async (
  questionId: number,
  answerId: number,
  comment: string
) => {
  return database
    .insert(comments)
    .values({ questionId, answerId, comment })
    .returning();
};

// version1 my code
// import { database } from "../database/connection";
// import { questions, answers } from "../database/schema";
// import { eq } from "drizzle-orm";

// export const createQuestion = async (userId: number, question: string) => {
//   return database.insert(questions).values({ userId, question }).returning();
// };

// export const getAllQuestionsFromDB = async () => {
//   return await database.select().from(questions);
// };

// export const deleteQuestionsFromDB = async (questionIdNumber: number) => {
//   await database.delete(questions).where(eq(questions.id, questionIdNumber));
// };

// export const getOneQuestionFromDB = async (questionId: number) => {
//   return await database
//     .select()
//     .from(questions)
//     .where(eq(questions.id, questionId));
// };

// export const createAnswerInDB = async (
//   questionId: number,
//   situation: string,
//   task: string,
//   action: string,
//   result: string
// ) => {
//   return database
//     .insert(answers)
//     .values({ questionId, situation, task, action, result })
//     .returning();
// };

// version original
// import { database } from "../database/connection";
// import { questions } from "../database/schema";
// import { eq } from "drizzle-orm";

// export const createQuestion = async (userId: number, question: string) => {
//   return database.insert(questions).values({ userId, question }).returning();
// };

// export const getAllQuestions = async () => {
//   return await database.select().from(questions);
// };

// export const deleteQuestions = async (questionIdNumber: number) => {
//   await database.delete(questions).where(eq(questions.id, questionIdNumber));
// };

// export const getOneQuestion = async (questionId: number) => {
//   return await database
//     .select()
//     .from(questions)
//     .where(eq(questions.id, questionId));
// };
