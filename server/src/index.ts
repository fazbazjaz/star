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

// for HTTP-Only Cookies :
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

// for a basic check on /api
app.get("/api", (req: Request, res: Response) => {
  res.json("STAR Server /api API Route");
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/questions", questionsRouter);

export const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Node Express Server listening on SERVER_PORT:${process.env.SERVER_PORT}`
  );
});
