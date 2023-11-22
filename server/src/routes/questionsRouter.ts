import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllQuestions,
  addQuestion
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestions);
questionsRouter.post("/add", authMiddleware, addQuestion);
