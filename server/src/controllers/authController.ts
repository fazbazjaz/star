import { OAuth2Client } from "google-auth-library";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { CustomJWTPayload } from "../types/types";
import { createUser, getUserByGoogleId } from "../helpers/users";
import { logger } from "../logger";

export const idTokenHandler = async (req: Request, res: Response) => {
  try {
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

    const verifyIdToken = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    logger.info({
      message: "idTokenHandler verifyIdToken",
      value: verifyIdToken
    });

    if (!verifyIdToken) {
      return res.status(401).json({ error: "Invalid ID Token" });
    }

    const idTokenPayload = verifyIdToken.getPayload();

    if (!idTokenPayload) {
      return res.status(401).json({ error: "Invalid ID Token Payload" });
    }

    const userGoogleId = idTokenPayload.sub;
    const userFirstName = idTokenPayload.given_name;
    const userLastName = idTokenPayload.family_name;
    const userEmail = idTokenPayload.email;
    const userPicture = idTokenPayload.picture;

    let user = await getUserByGoogleId(userGoogleId);

    if (!user || user.length === 0) {
      user = await createUser({
        googleId: userGoogleId,
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        picture: userPicture
      });
    }
    logger.info({ message: "idTokenHandler user", value: user });

    const userId = user[0].id;
    logger.info({ message: "idTokenHandler userId", value: userId });

    const customJWTPayload: CustomJWTPayload = {
      id: userId,
      googleId: userGoogleId
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

    logger.info({
      message: "idTokenHandler res.getHeaders()",
      value: res.getHeaders()
    });

    res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ------------------------------------------------------------------

export const authorizationCodePopupHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );

    const authorizationHeader = req.headers["authorization"];
    logger.info({
      message: "authorizationCodePopupHandler authorizationHeader",
      value: authorizationHeader
    });

    if (!authorizationHeader || typeof authorizationHeader !== "string") {
      return res
        .status(401)
        .json({ error: "Authorization Header missing or invalid" });
    }

    const authorizationCode = authorizationHeader.split(" ")[1] as string;
    logger.info({
      message: "authorizationCodePopupHandler authorizationCode",
      value: authorizationCode
    });

    if (!authorizationCode) {
      return res.status(401).json({ error: "No Authorization Code Provided" });
    }

    // exchange the AUTHORIZATION CODE for ACCESS TOKEN, REFRESH TOKEN, and ID TOKEN
    const response = await oAuth2Client.getToken(authorizationCode);
    logger.info({
      message: "authorizationCodePopupHandler response",
      value: response
    });
    logger.info({
      message: "authorizationCodePopupHandler response.tokens",
      value: response.tokens
    });

    // get the ACCESS TOKEN, REFRESH TOKEN, ID TOKEN, and Token Expiry Date
    const {
      // access_token: accessToken,
      // refresh_token: refreshToken,
      id_token: idToken
      // expiry_date: tokenExpiryDate
    } = response.tokens;
    logger.info({
      message: "authorizationCodePopupHandler idToken",
      value: idToken
    });

    // verify the ID TOKEN
    const verifyIdToken = await oAuth2Client.verifyIdToken({
      idToken: idToken as string,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    console.log("authorizationCodePopupHandler verifyIdToken:", verifyIdToken);
    logger.info({
      message: "authorizationCodePopupHandler verifyIdToken",
      value: verifyIdToken
    });

    // get the PAYLOAD from the ID TOKEN
    const idTokenPayload = verifyIdToken.getPayload();
    logger.info({
      message: "authorizationCodePopupHandler tokenPayload",
      value: idTokenPayload
    });

    if (!idTokenPayload) {
      return res.status(401).json({ error: "Invalid ID Token Payload" });
    }

    const userGoogleId = idTokenPayload.sub;
    const userFirstName = idTokenPayload.given_name;
    const userLastName = idTokenPayload.family_name;
    const userEmail = idTokenPayload.email;
    const userPicture = idTokenPayload.picture;

    let user = await getUserByGoogleId(userGoogleId);

    if (!user || user.length === 0) {
      user = await createUser({
        googleId: userGoogleId,
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        picture: userPicture
      });
    }
    logger.info({
      message: "authorizationCodePopupHandler user",
      value: user
    });

    const userId = user[0].id;
    logger.info({
      message: "authorizationCodePopupHandler userId",
      value: userId
    });

    const customJWTPayload: CustomJWTPayload = {
      id: userId,
      googleId: userGoogleId
    };
    logger.info({
      message: "authorizationCodePopupHandler customJWTPayload",
      value: customJWTPayload
    });

    const customJWT = jwt.sign(
      customJWTPayload,
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1h"
      }
    );
    logger.info({
      message: "authorizationCodePopupHandler customJWT",
      value: customJWT
    });

    if (!customJWT) {
      return res.status(500).json({ error: "Error signing a new customJWT" });
    }

    res.cookie("customJWT", customJWT, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000
    });

    logger.info({
      message: "authorizationCodeRedirectHandler res.getHeaders()",
      value: res.getHeaders()
    });

    res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

// ------------------------------------------------------------------

export const authorizationCodeRedirectHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const authorizationCode = req.query.code as string;
    logger.info({
      message: "authorizationCodeRedirectHandler authorizationCode",
      value: authorizationCode
    });

    if (!authorizationCode) {
      return res
        .status(401)
        .json({ error: "Invalid Authorization Code Provided" });
    }

    // exchange the AUTHORIZATION CODE for ACCESS TOKEN, REFRESH TOKEN, and ID TOKEN
    const response = await oAuth2Client.getToken(authorizationCode);
    logger.info({
      message: "authorizationCodeRedirectHandler response",
      value: response
    });
    logger.info({
      message: "authorizationCodeRedirectHandler response.tokens",
      value: response.tokens
    });

    // get the ACCESS TOKEN, REFRESH TOKEN, ID TOKEN, and Token Expiry Date
    const {
      // access_token: accessToken,
      // refresh_token: refreshToken,
      id_token: idToken
      // expiry_date: tokenExpiryDate
    } = response.tokens;
    logger.info({
      message: "authorizationCodeRedirectHandler idToken",
      value: idToken
    });

    // verify the ID TOKEN
    const verifyIdToken = await oAuth2Client.verifyIdToken({
      idToken: idToken as string,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    logger.info({
      message: "authorizationCodeRedirectHandler verifyIdToken",
      value: verifyIdToken
    });

    // get the PAYLOAD from the ID TOKEN
    const idTokenPayload = verifyIdToken.getPayload();
    logger.info({
      message: "authorizationCodeRedirectHandler tokenPayload",
      value: idTokenPayload
    });

    if (!idTokenPayload) {
      return res.status(401).json({ error: "Invalid ID Token Payload" });
    }

    const userGoogleId = idTokenPayload.sub;
    const userFirstName = idTokenPayload.given_name;
    const userLastName = idTokenPayload.family_name;
    const userEmail = idTokenPayload.email;
    const userPicture = idTokenPayload.picture;

    let user = await getUserByGoogleId(userGoogleId);

    if (!user || user.length === 0) {
      user = await createUser({
        googleId: userGoogleId,
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        picture: userPicture
      });
    }
    logger.info({
      message: "authorizationCodeRedirectHandler user",
      value: user
    });

    const userId = user[0].id;
    logger.info({
      message: "authorizationCodeRedirectHandler userId",
      value: userId
    });

    const customJWTPayload: CustomJWTPayload = {
      id: userId,
      googleId: userGoogleId
    };
    logger.info({
      message: "authorizationCodeRedirectHandler customJWTPayload",
      value: customJWTPayload
    });

    const customJWT = jwt.sign(
      customJWTPayload,
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1h"
      }
    );
    logger.info({
      message: "authorizationCodeRedirectHandler customJWT",
      value: customJWT
    });

    if (!customJWT) {
      return res.status(500).json({ error: "Error signing a new customJWT" });
    }

    res.cookie("customJWT", customJWT, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000
    });

    logger.info({
      message: "authorizationCodeRedirectHandler res.getHeaders()",
      value: res.getHeaders()
    });

    // redirect to the Client (with the HTTP-Only Cookie containing Custom JWT)
    res.redirect(`http://localhost:3000/`);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

// ------------------------------------------------------------------

export const userHandler = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  logger.info({
    message: "userHandler cookies",
    value: cookies
  });

  const customJWT = cookies.customJWT;
  logger.info({
    message: "userHandler customJWT",
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
      message: "userHandler verifiedCustomJWT",
      value: verifiedCustomJWT
    });

    if (!verifiedCustomJWT) {
      return res.status(401).json({ error: "Unauthorized - Invalid JWT" });
    }

    const userId = verifiedCustomJWT.id;
    logger.info({
      message: "userHandler userId",
      value: userId
    });

    const userGoogleId = verifiedCustomJWT.googleId;
    logger.info({
      message: "userHandler userGoogleId",
      value: userGoogleId
    });

    const userQuery = await getUserByGoogleId(userGoogleId);
    logger.info({
      message: "userHandler userQuery",
      value: userQuery
    });

    if (!userQuery || userQuery.length === 0) {
      return res
        .status(401)
        .json({ error: "Unauthorized - User Does Not Exist" });
    }

    if (userId !== userQuery[0].id || userGoogleId !== userQuery[0].googleId) {
      return res.status(401).json({
        error:
          "Unauthorized - Mismatch between User in CustomJWT and User in Database"
      });
    }

    const user = {
      ...userQuery[0],
      issuedAtTime: verifiedCustomJWT.iat,
      expirationTime: verifiedCustomJWT.exp
    };
    logger.info({
      message: "userHandler user",
      value: user
    });

    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
