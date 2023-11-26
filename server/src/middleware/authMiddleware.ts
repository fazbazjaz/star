import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
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
  // Every time the client makes a Request
  // It will come with the customJWT in an HTTP-Only Cookie

  const cookies = req.cookies;
  logger.info("authMiddleware cookies:", cookies);

  const customJWT = cookies.customJWT;
  logger.info("authMiddleware customJWT:", customJWT);

  if (!customJWT || typeof customJWT === "undefined") {
    return res
      .status(401)
      .json({ error: "Unauthorized - No Cookie with JWT Provided" });
  }

  try {
    // Verify the customJWT against our JWT_SECRET
    const verifiedCustomJWT = jwt.verify(
      customJWT,
      process.env.JWT_SECRET as Secret
    );
    logger.info("authMiddleware verifiedCustomJWT:", verifiedCustomJWT);

    // Store the verfied Custom JWT Payload in a customJWTPayload Property on the Request Object
    req.customJWTPayload = verifiedCustomJWT as CustomJWTPayload;
    logger.info("req.customJWTPayload:", req.customJWTPayload);

    // All the checks have passed Authorize the Request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid JWT" });
  }
};
