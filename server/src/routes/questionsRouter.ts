import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  addQuestion,
  findAllQuestionsByUser
} from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.post("/add", authMiddleware, addQuestion);
questionsRouter.get("/user/:userId", authMiddleware, findAllQuestionsByUser);
