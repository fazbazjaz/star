import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllQuestionsHandler,
  getQuestionsByPageHandler,
  getOneQuestionHandler,
  getAllQuestionsByUserHandler,
  createQuestionHandler,
  createAnswerHandler,
  createCommentHandler,
  editQuestionHandler,
  editAnswerHandler,
  editCommentHandler,
  deleteQuestionHandler,
  deleteAnswerHandler,
  deleteCommentHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

// Apply authMiddleware to all Routes
questionsRouter.use(authMiddleware);

// Questions
questionsRouter
  .route("/")
  .get(getAllQuestionsHandler)
  .post(createQuestionHandler);

questionsRouter.route("/infinite").get(getQuestionsByPageHandler);

questionsRouter
  .route("/:id")
  .get(getOneQuestionHandler)
  .put(editQuestionHandler)
  .delete(deleteQuestionHandler);

questionsRouter.route("/user/:id").get(getAllQuestionsByUserHandler);

// Answers
questionsRouter.route("/:id/answers").post(createAnswerHandler);

questionsRouter
  .route("/:id/answers/:answerId")
  .put(editAnswerHandler)
  .delete(deleteAnswerHandler);

// Comments
questionsRouter
  .route("/:id/answers/:answerId/comments")
  .post(createCommentHandler);

questionsRouter
  .route("/:id/answers/:answerId/comments/:commentId")
  .put(editCommentHandler)
  .delete(deleteCommentHandler);
