import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { CustomJWTPayload } from "../types/types";
import { logger } from "../logger";

// Add a new key to the Express Request interface
declare module "express" {
  interface Request {
    customJWTPayload?: CustomJWTPayload;
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  logger.info({
    message: "authMiddleware cookies",
    value: cookies
  });

  const customJWT = cookies.customJWT;
  logger.info({
    message: "authMiddleware customJWT",
    value: customJWT
  });

  if (!customJWT || typeof customJWT === "undefined") {
    return res
      .status(401)
      .json({ error: "Unauthorized - No Cookie with JWT Provided" });
  }

  try {
    const verifiedCustomJWT = jwt.verify(
      customJWT,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    logger.info({
      message: "authMiddleware verifiedCustomJWT",
      value: customJWT
    });

    req.customJWTPayload = verifiedCustomJWT as CustomJWTPayload;
    logger.info({
      message: "authMiddleware req.customJWTPayload",
      value: req.customJWTPayload
    });

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid JWT" });
  }
};
