import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addQuestion,
  getAllQuestions
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestions);
questionsRouter.post("/add", authMiddleware, addQuestion);
