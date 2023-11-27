import { database } from "../database/connection";
import { questions, answers, comments } from "../database/schema";
import { eq, and } from "drizzle-orm";
import { Request, Response } from "express";
import {
  createQuestion,
  deleteQuestions,
  getOneQuestionWithAnswersAndComments
} from "../helpers/questions";
import { logger } from "../logger";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;
    logger.info({ message: "addQuestion user", value: user });

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const question = req.body.question;
    logger.info({ message: "addQuestion question ", value: question });

    if (!question) {
      return res.status(400).json({ error: "No Question on the Request Body" });
    }

    const userId = user.id;
    logger.info({ message: "addQuestion userId", value: userId });

    const queryQuestion = await createQuestion(userId, question);
    logger.info({ message: "addQuestion queryQuestion", value: queryQuestion });

    res.status(200).json(queryQuestion);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const query = await database.select().from(questions);
    logger.info("getAllQuestions query", query);

    const data = query;
    logger.info({
      message: "getAllQuestions data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = Number(req.params.id);
    logger.info({
      message: "deleteQuestion questionId",
      value: questionId
    });

    if (!questionId) {
      return res.status(400).json({ error: "No questionId provided" });
    }

    if (isNaN(questionId)) {
      return res.status(400).json({ error: "Invalid questionId format" });
    }

    await deleteQuestions(questionId);

    res.status(204).end();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findAllQuestionsByUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  logger.info({
    message: "findAllQuestionsByUser userId",
    value: userId
  });

  try {
    const query = await database
      .select()
      .from(questions)
      .where(eq(questions.userId, userId));
    logger.info({
      message: "findAllQuestionsByUser query",
      value: query
    });

    const data = query;
    logger.info({
      message: "findAllQuestionsByUser data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const findOneQuestion = async (req: Request, res: Response) => {
  const questionId = parseInt(req.params.id);
  logger.info({
    message: "findOneQuestion questionId",
    value: questionId
  });

  try {
    const query = await getOneQuestionWithAnswersAndComments(questionId);
    logger.info({
      message: "findOneQuestion query",
      value: query
    });

    if (!query || query.length === 0) {
      res.status(404).json({ error: "No Question Found" });
      return;
    }

    const data = query[0];
    logger.info({
      message: "findOneQuestion data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const createAnswer = async (req: Request, res: Response) => {
  const questionId = Number(req.params.id);
  logger.info({
    message: "createAnswer questionId",
    value: questionId
  });

  if (!questionId) {
    return res.status(401).json({ error: "You did not include a Question ID" });
  }

  const { situation, task, action, result } = req.body;
  logger.info({
    message: "createAnswer req.body",
    value: req.body
  });

  if (!situation || !task || !action || !result) {
    return res.status(401).json({ error: "Your Answer was not Complete" });
  }

  try {
    const questionIdQuery = await database
      .select()
      .from(questions)
      .where(eq(questions.id, questionId));
    logger.info({
      message: "createAnswer questionIdQuery",
      value: questionIdQuery
    });

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
    logger.info({
      message: "createAnswer insertAnswerQuery",
      value: insertAnswerQuery
    });

    const data = insertAnswerQuery[0];
    logger.info({
      message: "createAnswer data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error Adding Your Answer to the Database" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const questionId = Number(req.params.id);
  logger.info({
    message: "createComment questionId",
    value: questionId
  });

  if (!questionId) {
    return res.status(400).json({ error: `Invalid Question ID Provided` });
  }

  const answerId = Number(req.params.answerId);
  logger.info({
    message: "createComment answerId",
    value: answerId
  });

  if (!answerId) {
    return res.status(400).json({ error: `Invalid Answer ID Provided` });
  }

  const comment = req.body.comment;
  logger.info({
    message: "createComment comment",
    value: comment
  });

  if (!comment) {
    return res.status(400).json({ error: `Invalid Comment Provided` });
  }

  try {
    const answerQuery = await database
      .select()
      .from(questions)
      .innerJoin(answers, eq(questions.id, answers.questionId))
      .where(and(eq(answers.id, answerId), eq(answers.id, answerId)));
    logger.info({
      message: "createComment answerQuery",
      value: answerQuery
    });

    if (!answerQuery || answerQuery.length === 0) {
      return res.status(404).json({ error: "Answer not found" });
    }

    const insertCommentQuery = await database
      .insert(comments)
      .values({
        answerId,
        comment
      })
      .returning();
    logger.info({
      message: "createComment insertCommentQuery",
      value: insertCommentQuery
    });

    const data = insertCommentQuery[0];
    logger.info({
      message: "createComment data",
      value: data
    });

    res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Adding Your Comment to the Database" });
  }
};
