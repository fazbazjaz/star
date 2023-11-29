import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllQuestionsHandler,
  createQuestionHandler,
  deleteQuestionHandler,
  findAllQuestionsByUserHandler,
  findOneQuestionHandler,
  createAnswerHandler,
  createCommentHandler,
  editQuestionHandler,
  deleteAnswerHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

// Questions
questionsRouter.get("/", authMiddleware, getAllQuestionsHandler);
questionsRouter.post("/", authMiddleware, createQuestionHandler);
questionsRouter.put("/:id", authMiddleware, editQuestionHandler);
questionsRouter.delete("/:id", authMiddleware, deleteQuestionHandler);

questionsRouter.get("/:id", authMiddleware, findOneQuestionHandler);
questionsRouter.get("/user/:id", authMiddleware, findAllQuestionsByUserHandler);

// Answers
questionsRouter.post("/:id/answers", authMiddleware, createAnswerHandler);
questionsRouter.delete(
  "/:id/answers/:answerId",
  authMiddleware,
  deleteAnswerHandler
);

// Comments
questionsRouter.post(
  "/:id/answers/:answerId/comments",
  authMiddleware,
  createCommentHandler
);
