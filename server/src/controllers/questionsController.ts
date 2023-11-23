import { database } from "../database/connection";
import { questions, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

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

    const userGoogleId = user.google_id;

    const userQuery = await database
      .selectDistinct({ id: users.id })
      .from(users)
      .where(eq(users.google_id, userGoogleId))
      .limit(1);

    const userId = userQuery[0].id;

    const insertQuestionQuery = await database
      .insert(questions)
      .values({ userId, question })
      .returning();

    const data = insertQuestionQuery[0];

    res.status(200).json(data);
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

    // Convert questionId to number
    const questionIdNumber = parseInt(questionId, 10);

    if (isNaN(questionIdNumber)) {
      return res.status(400).json({ error: "Invalid questionId format" });
    }

    await database.delete(questions).where(eq(questions.id, questionIdNumber));

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
