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
  deleteAnswerHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestionsHandler);
questionsRouter.post("/add", authMiddleware, createQuestionHandler);
questionsRouter.delete("/:id", authMiddleware, deleteQuestionHandler);
questionsRouter.get("/user/:id", authMiddleware, findAllQuestionsByUserHandler);
questionsRouter.get("/:id", authMiddleware, findOneQuestionHandler);

questionsRouter.post("/:id/answers", authMiddleware, createAnswerHandler);

questionsRouter.post(
  "/:id/answers/:answerId/comments",
  authMiddleware,
  createCommentHandler
);

questionsRouter.delete("/:id/answers/:answerId", deleteAnswerHandler);
