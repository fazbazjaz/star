import { OAuth2Client } from "google-auth-library";
import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import { CustomJWTPayload, UserCookie } from "../types/types";
import { createUser, findUserByGoogleId } from "../helpers/users";
import { logger } from "../logger";

export const idTokenHandler = async (req: Request, res: Response) => {
  logger.info({
    message: "idTokenHandler req.headers.host",
    value: req.headers["host"]
  });

  const oAuth2Client = new OAuth2Client();

  const authorizationHeader = req.headers["authorization"];
  logger.info({
    message: "idTokenHandler authorizationHeader",
    value: authorizationHeader
  });

  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return res
      .status(401)
      .json({ error: "Authorization Header missing or invalid" });
  }

  const jwtTokenParts = authorizationHeader.split(" ");
  logger.info({
    message: "idTokenHandler jwtTokenParts",
    value: jwtTokenParts
  });

  if (
    jwtTokenParts.length !== 2 ||
    jwtTokenParts[0].toLowerCase() !== "bearer"
  ) {
    return res
      .status(401)
      .json({ error: "Invalid Authorization Header format" });
  }

  const idToken = jwtTokenParts[1];
  logger.info({ message: "idTokenHandler idToken", value: idToken });

  let verifyIdToken;

  try {
    verifyIdToken = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid ID Token" });
  }
  logger.info({
    message: "idTokenHandler verifyIdToken",
    value: verifyIdToken
  });

  const idTokenPayload = verifyIdToken.getPayload();

  if (!idTokenPayload) {
    return res.status(401).json({ error: "Invalid ID Token Payload" });
  }

  const userGoogleId = idTokenPayload.sub;
  const userFirstname = idTokenPayload.given_name;
  const userLastname = idTokenPayload.family_name;
  const userEmail = idTokenPayload.email;
  const userPicture = idTokenPayload.picture;

  let user;

  try {
    user = await findUserByGoogleId(userGoogleId);
    if (!user || user.length === 0) {
      user = await createUser({
        google_id: userGoogleId,
        firstname: userFirstname,
        lastname: userLastname,
        email: userEmail,
        picture: userPicture
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  logger.info({ message: "idTokenHandler user", value: user });

  const userId = user[0].id;

  const customJWTPayload: CustomJWTPayload = {
    id: userId,
    google_id: userGoogleId
  };
  logger.info({
    message: "idTokenHandler customJWTPayload",
    value: customJWTPayload
  });

  const customJWT = jwt.sign(
    customJWTPayload,
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "1h"
    }
  );
  logger.info({ message: "idTokenHandler customJWT", value: customJWT });

  if (!customJWT) {
    return res.status(500).json({ error: "Error signing a new customJWT" });
  }

  res.cookie("customJWT", customJWT, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000
  });

  const userCookie: UserCookie = {
    id: userId,
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };
  logger.info({ message: "idTokenHandler userCookie", value: userCookie });

  res.cookie("user", userCookie, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 3600000
  });

  res.status(200).send();
};
