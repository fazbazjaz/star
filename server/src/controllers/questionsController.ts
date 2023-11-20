import { createQuestion } from "../helpers/questions";
import { Request, Response } from "express";
import { findUserByGoogleId } from "../helpers/users";

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

    // console.log("userQuery:", userQuery);

    const userId = (await findUserByGoogleId(userGoogleId))[0].id;
    // console.log("userId:", userId);

    const result = await createQuestion(userId, question);

    // console.log("insertQuestionQuery:", insertQuestionQuery);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};
