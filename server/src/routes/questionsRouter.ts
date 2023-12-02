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
  editCommentHandler,
  getQuestionsByCursorHandler
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

// Apply authMiddleware to all Routes
questionsRouter.use(authMiddleware);

// Questions
questionsRouter.route("/user/:id").get(findAllQuestionsByUserHandler);

questionsRouter.route("/infinite").get(getQuestionsByCursorHandler);

questionsRouter
  .route("/:id")
  .get(findOneQuestionHandler)
  .put(editQuestionHandler)
  .delete(deleteQuestionHandler);

questionsRouter
  .route("/")
  .get(getAllQuestionsHandler)
  .post(createQuestionHandler);

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
