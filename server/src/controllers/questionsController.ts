import { database } from "../database/connection";
import { questions, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;
    // console.log("addQuestion user", user);

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const userGoogleId = user.google_id;
    // console.log("addQuestion userGoogleId", userGoogleId);

    const question = req.body.question;
    // console.log("addQuestion question:", question);

    const userQuery = await database
      .selectDistinct({ id: users.id })
      .from(users)
      .where(eq(users.google_id, userGoogleId))
      .limit(1);

    // console.log("userQuery:", userQuery);

    const userId = userQuery[0].id;
    // console.log("userId:", userId);

    const insertQuestionQuery = await database
      .insert(questions)
      .values({ userId, question })
      .returning();

    // console.log("insertQuestionQuery:", insertQuestionQuery);

    res.status(200).json({ success: true, data: insertQuestionQuery });
  } catch (error) {
    res.status(500).json(error);
  }
};
