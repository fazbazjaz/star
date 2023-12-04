import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getAllUsersHandler,
  getUserByIdHandler
} from "../controllers/usersController";

export const usersRouter = express.Router();

usersRouter.use(authMiddleware);

usersRouter.get("/", getAllUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);
