import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllQuestions,
  addQuestion,
  deleteQuestion // Add this line
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.get("/", authMiddleware, getAllQuestions);
questionsRouter.post("/add", authMiddleware, addQuestion);
questionsRouter.delete("/:id", authMiddleware, deleteQuestion); // Add this line
