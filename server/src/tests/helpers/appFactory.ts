import {
  getAllQuestionsHandler,
  createQuestionHandler,
  deleteQuestionHandler,
  findAllQuestionsByUserHandler,
  findOneQuestionHandler
} from "../../controllers/questionsController";
import express from "express";

export function createAppWithQuestionRoutes() {
  const app = express();
  app.use(express.json());
  const questionsRouter = express.Router();

  questionsRouter.get("/", getAllQuestionsHandler);
  questionsRouter.post("/add", createQuestionHandler);
  questionsRouter.delete("/:id", deleteQuestionHandler);
  questionsRouter.get("/user/:id", findAllQuestionsByUserHandler);
  questionsRouter.get("/:id", findOneQuestionHandler);
  app.use("/api/questions", questionsRouter);
  return app;
}
