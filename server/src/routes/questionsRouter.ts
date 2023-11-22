import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getAllQuestions, addQuestion, findAllQuestionsByUser, findOneQuestion  } from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestions);
questionsRouter.post("/add", authMiddleware, addQuestion);
questionsRouter.get("/user/:userId", authMiddleware, findAllQuestionsByUser);
questionsRouter.get("/:questionId", authMiddleware, findOneQuestion);
