import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { addQuestion } from "../controllers/questionsController";

export const questionsRouter = express.Router();

questionsRouter.post("/add", authMiddleware, addQuestion);
