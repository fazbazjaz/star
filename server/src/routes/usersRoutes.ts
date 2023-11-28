import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllUsersHandler,
  getUserByIdHandler
} from "../controllers/usersController";

export const usersRouter = express.Router();

usersRouter.get("/", authMiddleware, getAllUsersHandler);
usersRouter.get("/:id", authMiddleware, getUserByIdHandler);
