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
  deleteAnswerHandler,
  editAnswerHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

// Questions
questionsRouter
  .route("/")
  .get(authMiddleware, getAllQuestionsHandler)
  .post(authMiddleware, createQuestionHandler);

questionsRouter
  .route("/:id")
  .put(authMiddleware, editQuestionHandler)
  .delete(authMiddleware, deleteQuestionHandler)
  .get(authMiddleware, findOneQuestionHandler);

questionsRouter
  .route("/user/:id")
  .get(authMiddleware, findAllQuestionsByUserHandler);

// Answers
questionsRouter.route("/:id/answers").post(authMiddleware, createAnswerHandler);

questionsRouter
  .route("/:id/answers/:answerId")
  .delete(authMiddleware, deleteAnswerHandler)
  .put(authMiddleware, editAnswerHandler);

// Comments
questionsRouter.post(
  "/:id/answers/:answerId/comments",
  authMiddleware,
  createCommentHandler
);
