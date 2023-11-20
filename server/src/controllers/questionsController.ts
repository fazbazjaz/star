import { database } from "../database/connection";
import { questions, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;
    // console.log("addQuestion user:", user);

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const question = req.body.question;
    // console.log("addQuestion question:", question);

    if (!question) {
      return res.status(400).json({ error: "No Question on the Request Body" });
    }

    const userGoogleId = user.google_id;
    // console.log("addQuestion userGoogleId:", userGoogleId);

    const userQuery = await database
      .selectDistinct({ id: users.id })
      .from(users)
      .where(eq(users.google_id, userGoogleId))
      .limit(1);
    // console.log("addQuestion userQuery:", userQuery);

    const userId = userQuery[0].id;
    // console.log("addQuestion userId:", userId);

    const insertQuestionQuery = await database
      .insert(questions)
      .values({ userId, question })
      .returning();
    // console.log("addQuestion insertQuestionQuery:", insertQuestionQuery);

    const payload = insertQuestionQuery[0];
    // console.log("addQuestion payload:", payload);

    res.json({ success: true, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questionsQuery = await database.select().from(questions);
    // console.log("getAllQuestions questionsQuery:", questionsQuery);

    const payload = questionsQuery;
    // console.log("getAllQuestions payload:", payload);

    res.json({ success: true, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
