import { database } from "../database/connection";
import { questions, answers } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import {
  createQuestion,
  deleteQuestions,
  getQuestionAndAllAnswers
} from "../helpers/questions";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const question = req.body.question;

    if (!question) {
      return res.status(400).json({ error: "No Question on the Request Body" });
    }

    const userId = user.id;

    const queryQuestion = await createQuestion(userId, question);

    res.status(200).json(queryQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const query = await database.select().from(questions);
    const data = query;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;

    if (!questionId) {
      return res.status(400).json({ error: "No questionId provided" });
    }

    const questionIdNumber = parseInt(questionId, 10);

    if (isNaN(questionIdNumber)) {
      return res.status(400).json({ error: "Invalid questionId format" });
    }

    await deleteQuestions(questionIdNumber);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findAllQuestionsByUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const query = await database
      .select()
      .from(questions)
      .where(eq(questions.userId, userId));

    const data = query;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findOneQuestion = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);

  try {
    const query = await getQuestionAndAllAnswers(questionId);
    // console.log("findOneQuestion query:", query);

    const data = query[0];
    if (data === undefined) {
      res.status(404).json({ error: "No Question Found!" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const createAnswer = async (req: Request, res: Response) => {
  const questionId = Number(req.params.id);
  // console.log("createAnswer questionId:", questionId);

  if (!questionId) {
    return res.status(401).json({ error: "You did not include a Question ID" });
  }

  const { situation, task, action, result } = req.body;
  // console.log("createAnswer situation, task, action, result:", situation, task, action, result);

  if (!situation || !task || !action || !result) {
    return res.status(401).json({ error: "Your Answer was not Complete" });
  }

  try {
    const questionIdQuery = await database
      .select()
      .from(questions)
      .where(eq(questions.id, questionId));

    if (!questionIdQuery || questionIdQuery.length === 0) {
      return res
        .status(401)
        .json({ error: `There is no Question with ID ${questionId}` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  try {
    const insertAnswerQuery = await database
      .insert(answers)
      .values({ questionId, situation, task, action, result })
      .returning();
    // console.log("createAnswer insertAnswerQuery:", insertAnswerQuery);

    const data = insertAnswerQuery[0];
    // console.log("createAnswer data:", data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error Adding Your Answer to the Database" });
  }
};
