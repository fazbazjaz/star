import {
  createQuestionHandler,
  deleteQuestionHandler,
  getAllQuestionsByUserHandler,
  getOneQuestionHandler,
  getQuestionsByPageHandler
} from "../../controllers/questionsController";
import express from "express";

export function createAppWithQuestionRoutes() {
  const app = express();
  app.use(express.json());
  const questionsRouter = express.Router();

  questionsRouter.get("/", getQuestionsByPageHandler);
  questionsRouter.post("/add", createQuestionHandler);
  questionsRouter.delete("/:id", deleteQuestionHandler);
  questionsRouter.get("/user/:id", getAllQuestionsByUserHandler);
  questionsRouter.get("/:id", getOneQuestionHandler);
  app.use("/api/questions", questionsRouter);
  return app;
}
