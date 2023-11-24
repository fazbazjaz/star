import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
  findAllQuestionsByUser,
  findOneQuestion
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestions);
questionsRouter.post("/add", authMiddleware, addQuestion);
questionsRouter.delete("/:id", authMiddleware, deleteQuestion);
questionsRouter.get("/user/:id", authMiddleware, findAllQuestionsByUser);
questionsRouter.get("/:id", authMiddleware, findOneQuestion);
