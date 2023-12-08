import express from "express";
import {
  idTokenHandler,
  userHandler,
  authorizationCodePopupHandler,
  authorizationCodeRedirectHandler
} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/google/idtoken", idTokenHandler);
authRouter.post("/google/authorizationcode", authorizationCodePopupHandler);
authRouter.get("/google/authorizationcode", authorizationCodeRedirectHandler);
authRouter.get("/user", userHandler);
