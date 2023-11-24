import {
  addQuestion,
  deleteQuestion,
  findAllQuestionsByUser, findOneQuestion,
  getAllQuestions
} from "../../controllers/questionsController";
import express from "express";

export function createAppWithQuestionRoutes() {
  const app = express();
  app.use(express.json());
  const questionsRouter = express.Router();

  questionsRouter.get("/", getAllQuestions);
  questionsRouter.post("/add", addQuestion);
  questionsRouter.delete("/:id", deleteQuestion);
  questionsRouter.get("/user/:id", findAllQuestionsByUser);
  questionsRouter.get("/:id", findOneQuestion);
  app.use("/api/questions", questionsRouter);
  return app;
}
