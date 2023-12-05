import dotenvFlow from "dotenv-flow";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { usersRouter } from "./routes/usersRoutes";
import { authRouter } from "./routes/authRoutes";
import { questionsRouter } from "./routes/questionsRouter";

dotenvFlow.config();

export const app = express();

app.use(cookieParser());

app.use(
  cors({
    exposedHeaders: ["set-cookie"],
    origin: true,
    // origin: "https://cyf-star-client-ios.onrender.com",
    // origin: "https://*.onrender.com",
    credentials: true // Server will accept Cookies from the Client
  })
);

app.use(express.json());

// basic check on /
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "STAR Server / Root Route" });
});

// basic check on /api
app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({ message: "STAR Server /api API Route" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/questions", questionsRouter);
