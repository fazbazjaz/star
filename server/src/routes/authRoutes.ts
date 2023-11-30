import express, { Request, Response } from "express";
import { idTokenHandler, userHandler } from "../controllers/authController";

export const authRouter = express.Router();

// for a basic check on /api/auth/
authRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "STAR Server /api/auth Auth Route"
  });
});

authRouter.post("/google/idtoken", idTokenHandler);
authRouter.get("/user", userHandler);
