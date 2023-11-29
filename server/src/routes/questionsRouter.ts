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
  editQuestionHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestionsHandler);
questionsRouter.post("/add", authMiddleware, createQuestionHandler);
questionsRouter.delete("/:id", authMiddleware, deleteQuestionHandler);
questionsRouter.get("/user/:id", authMiddleware, findAllQuestionsByUserHandler);
questionsRouter.get("/:id", authMiddleware, findOneQuestionHandler);
questionsRouter.put("/:id", authMiddleware, editQuestionHandler);
questionsRouter.post("/:id/answers", authMiddleware, createAnswerHandler);

questionsRouter.post(
  "/:id/answers/:answerId/comments",
  authMiddleware,
  createCommentHandler
);
