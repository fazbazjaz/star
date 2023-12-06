import express from "express";
import {
  idTokenHandler,
  userHandler,
  authorizationCodePopupHandler,
  authorizationCodeRedirectHandler,
  gitHubHandler
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

export const authRouter = express.Router();

authRouter.post("/google/idtoken", idTokenHandler);
authRouter.post("/google/authorizationcode", authorizationCodePopupHandler);
authRouter.get("/google/authorizationcode", authorizationCodeRedirectHandler);
authRouter.get("/user", userHandler);
authRouter.get("/github", authMiddleware, gitHubHandler);
