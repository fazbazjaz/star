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
  deleteCommentHandler,
  editAnswerHandler,
  editCommentsHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

// Questions
questionsRouter
  .route("/")
  .get(authMiddleware, getAllQuestionsHandler)
  .post(authMiddleware, createQuestionHandler);

questionsRouter
  .route("/:id")
  .get(authMiddleware, findOneQuestionHandler)
  .put(authMiddleware, editQuestionHandler)
  .delete(authMiddleware, deleteQuestionHandler);

questionsRouter
  .route("/user/:id")
  .get(authMiddleware, findAllQuestionsByUserHandler);

// Answers
questionsRouter.route("/:id/answers").post(authMiddleware, createAnswerHandler);

questionsRouter
  .route("/:id/answers/:answerId")
  .put(authMiddleware, editAnswerHandler)
  .delete(authMiddleware, deleteAnswerHandler);

// Comments
questionsRouter
  .route("/:id/answers/:answerId/comments")
  .post(authMiddleware, createCommentHandler);

questionsRouter
  .route("/:id/answers/:answerId/comments/:commentId")
  .put(authMiddleware, editCommentsHandler)
  .delete(authMiddleware, deleteCommentHandler);
