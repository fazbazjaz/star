import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { CustomJWTPayload } from "../types/types";
// import { logger } from "../logger";

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
  // [1] HTTP ONLY COOKIE VERSION
  // const cookies = req.cookies;
  // logger.info({
  //   message: "authMiddleware cookies",
  //   value: cookies
  // });

  // [1] HTTP ONLY COOKIE VERSION
  // const customJWT = cookies.customJWT;
  // logger.info({
  //   message: "authMiddleware customJWT",
  //   value: customJWT
  // });

  // [2] JWT IN BODY VERSION
  const authorizationHeader = req.headers["authorization"];
  // logger.info({
  //   message: "userHandler authorizationHeader",
  //   value: authorizationHeader
  // });

  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return res
      .status(401)
      .json({ error: "Authorization Header missing or invalid" });
  }

  const jwtTokenParts = authorizationHeader.split(" ");
  // logger.info({
  //   message: "userHandler jwtTokenParts",
  //   value: jwtTokenParts
  // });

  if (
    jwtTokenParts.length !== 2 ||
    jwtTokenParts[0].toLowerCase() !== "bearer"
  ) {
    return res
      .status(401)
      .json({ error: "Invalid Authorization Header format" });
  }

  const customJWT = jwtTokenParts[1];
  // logger.info({ message: "userHandler customJWT", value: customJWT });

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
    // logger.info({
    //   message: "authMiddleware verifiedCustomJWT",
    //   value: customJWT
    // });

    req.customJWTPayload = verifiedCustomJWT as CustomJWTPayload;
    // logger.info({
    //   message: "authMiddleware req.customJWTPayload",
    //   value: req.customJWTPayload
    // });

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid JWT" });
  }
};
