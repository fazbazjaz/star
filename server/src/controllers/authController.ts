import { OAuth2Client } from "google-auth-library";
import jwt, { Secret } from "jsonwebtoken";
import { database } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { CustomJWTPayload } from "../types/types";

export const idTokenHandler = async (req: Request, res: Response) => {
  // initialise a new OAuth2.0 Client
  const oAuth2Client = new OAuth2Client();

  const authorizationHeader = req.headers["authorization"];
  // console.log("authorizationHeader:", authorizationHeader);
  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return res
      .status(401)
      .json({ error: "Authorization Header missing or invalid" });
  }

  const jwtTokenParts = authorizationHeader.split(" ");
  // console.log("jwtTokenParts:", jwtTokenParts);
  if (
    jwtTokenParts.length !== 2 ||
    jwtTokenParts[0].toLowerCase() !== "bearer"
  ) {
    return res
      .status(401)
      .json({ error: "Invalid Authorization Header format" });
  }

  // get the ID TOKEN from the Request Headers
  const idToken = jwtTokenParts[1];
  // console.log("idToken:", idToken);

  // verify the ID TOKEN
  let verifyIdToken;
  try {
    verifyIdToken = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid ID Token" });
  }
  // console.log("verifyIdToken:", verifyIdToken);

  // get the PAYLOAD from the ID TOKEN
  const idTokenPayload = verifyIdToken.getPayload();
  // console.log("idTokenPayload:", idTokenPayload);

  if (!idTokenPayload) {
    return res.status(401).json({ error: "Invalid ID Token Payload" });
  }

  // get the User Information from the ID TOKEN PAYLOAD
  const userGoogleId = idTokenPayload.sub; // fix these typing issues later
  const userFirstname = idTokenPayload.given_name;
  const userLastname = idTokenPayload.family_name;
  const userEmail = idTokenPayload.email;
  const userPicture = idTokenPayload.picture;

  // check if there is an Existing User with the same Google ID
  let user;

  try {
    user = await database
      .select()
      .from(users)
      .where(eq(users.google_id, userGoogleId));
  } catch (error) {
    // Handle database error
    return res
      .status(500)
      .json({ error: "Error finding Existing User in the Database" });
  }
  // console.log("existingUser:", existingUser);

  // if there is no Existing User with that Google ID, create a New User
  if (user.length === 0) {
    try {
      user = await database
        .insert(users)
        .values({
          google_id: userGoogleId,
          firstname: userFirstname,
          lastname: userLastname,
          email: userEmail,
          picture: userPicture
        })
        .returning();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating a New User in the Database" });
    }
  }

  // get the userId from the previous Database Query
  const userId = user[0].id;

  // prepare a Payload for our own custom JWT with User information
  const customJWTPayload: CustomJWTPayload = {
    id: userId,
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };
  // console.log("customJWTPayload:", customJWTPayload);

  // generate our own custom JWT signing it with our own JWT_SECRET
  const customJWT = jwt.sign(
    customJWTPayload,
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "1h"
    }
  );
  // console.log("customJWT", customJWT);

  if (!customJWT) {
    return res.status(500).json({ error: "Error signing a new customJWT" });
  }

  // set the JWT as an HTTP-Only Cookie
  res.cookie("customJWT", customJWT, {
    httpOnly: true, // set the cookie as HTTP-Only
    secure: false, // enable "secure" to use HTTPS
    sameSite: "none", // "sameSite" determines how the cookie is sent with Cross-Origin Requests "strict" | "lax" | "none"
    maxAge: 3600000 // set expiry of 1 hour to match the customJWT
  });

  // because we cannot access the HTTP-Only Cookie on the frontend
  // we need to send another Cookie with Non-Sensitive User Information
  const userCookieData = {
    id: userId,
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };

  res.cookie("user", userCookieData, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge: 3600000
  });

  // Respond (but with no Body)
  res.status(200).send();
};

export const authorizationCodePopupHandler = async (
  req: Request,
  res: Response
) => {
  // initialise a new OAuth2.0 Client
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage"
  );

  // get the AUTHORIZATION CODE from the Request Headers
  const authorizationCode = req.headers["authorization"]?.split(
    " "
  )[1] as string;
  // console.log("authorizationCode:", authorizationCode);

  // exchange the AUTHORIZATION CODE for ACCESS TOKEN, REFRESH TOKEN, and ID TOKEN
  const response = await oAuth2Client.getToken(authorizationCode);
  // console.log("response:", response);

  // console.log("response.tokens", response.tokens);

  // get the ACCESS TOKEN, REFRESH TOKEN, ID TOKEN, and Token Expiry Date
  const {
    // access_token: accessToken,
    // refresh_token: refreshToken,
    id_token: idToken
    // expiry_date: tokenExpiryDate,
  } = response.tokens;

  // verify the ID TOKEN
  const verifyIdToken = await oAuth2Client.verifyIdToken({
    idToken: idToken as string,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  // console.log("verifyIdToken:", verifyIdToken);

  // get the PAYLOAD from the ID TOKEN
  const idTokenPayload = verifyIdToken.getPayload();
  // console.log("tokenPayload", idTokenPayload);

  if (!idTokenPayload) {
    return; // type check, fix this later
  }

  // get the User Information from the PAYLOAD
  const userGoogleId = idTokenPayload.sub;
  const userFirstname = idTokenPayload.given_name;
  const userLastname = idTokenPayload.family_name;
  const userEmail = idTokenPayload.email;
  const userPicture = idTokenPayload.picture;

  // check if there is an Existing User with the same Google ID
  const existingUser = await database
    .select()
    .from(users)
    .where(eq(users.google_id, userGoogleId));

  // console.log("existingUser:", existingUser);

  // if there is no Existing User with that Google ID, create a New User
  if (existingUser.length === 0) {
    await database
      .insert(users)
      .values({
        google_id: userGoogleId,
        firstname: userFirstname,
        lastname: userLastname,
        email: userEmail,
        picture: userPicture
      })
      .returning();

    // console.log("newUser:", newUser);
  }

  // prepare a Payload for our own custom JWT with User information
  const customJWTPayload = {
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };
  // console.log("customJWTPayload:", customJWTPayload);

  // generate our own custom JWT signing it with our own JWT_SECRET
  const customJWT = jwt.sign(
    customJWTPayload,
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "1h"
    }
  );
  // console.log("customJWT", customJWT);

  // set the JWT as an HTTP-Only Cookie
  res.cookie("customJWT", customJWT, {
    httpOnly: true, // set the cookie as HTTP-Only
    secure: false, // enable "secure" to use HTTPS
    sameSite: "none", // "sameSite" determines how the cookie is sent with Cross-Origin Requests "strict" | "lax" | "none"
    maxAge: 3600000 // set expiry of 1 hour to match the customJWT
  });

  // because we cannot access the HTTP-Only Cookie on the frontend
  // we need to send another Cookie with Non-Sensitive User Information
  const userCookieData = {
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };

  res.cookie("user", userCookieData, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge: 3600000
  });

  // Respond (but with no Body)
  res.status(200).send();
};

export const authorizationCodeRedirectHandler = async (
  req: Request,
  res: Response
) => {
  // initialise a new OAuth2.0 Client
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authorizationCode = req.query.code as string;
  // console.log("authorizationCode:", authorizationCode);

  // exchange the AUTHORIZATION CODE for ACCESS TOKEN, REFRESH TOKEN, and ID TOKEN
  const response = await oAuth2Client.getToken(authorizationCode);
  // console.log("response:", response);
  // console.log("response.tokens", response.tokens);

  // get the ACCESS TOKEN, REFRESH TOKEN, ID TOKEN, and Token Expiry Date
  const {
    // access_token: accessToken,
    // refresh_token: refreshToken,
    id_token: idToken
    // expiry_date: tokenExpiryDate,
  } = response.tokens;

  // // verify the ID TOKEN
  const verifyIdToken = await oAuth2Client.verifyIdToken({
    idToken: idToken as string,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  // console.log("verifyIdToken:", verifyIdToken);

  // get the PAYLOAD from the ID TOKEN
  const idTokenPayload = verifyIdToken.getPayload();
  // console.log("tokenPayload", idTokenPayload);

  // get the User Information from the PAYLOAD
  const userGoogleId = idTokenPayload?.sub as string; // fix this typing issue later
  const userFirstname = idTokenPayload?.given_name;
  const userLastname = idTokenPayload?.family_name;
  const userEmail = idTokenPayload?.email;
  const userPicture = idTokenPayload?.picture;

  // check if there is an Existing User with the same Google ID
  const existingUser = await database
    .select()
    .from(users)
    .where(eq(users.google_id, userGoogleId));
  // console.log("existingUser:", existingUser);

  // if there is no Existing User with that Google ID, create a New User
  if (existingUser.length === 0) {
    await database
      .insert(users)
      .values({
        google_id: userGoogleId,
        firstname: userFirstname,
        lastname: userLastname,
        email: userEmail,
        picture: userPicture
      })
      .returning();
  }

  // prepare a Payload for our own custom JWT with User information
  const customJWTPayload = {
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };
  // console.log("customJWTPayload:", customJWTPayload);

  // generate our own custom JWT signing it with our own JWT_SECRET
  const customJWT = jwt.sign(
    customJWTPayload,
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: "1h"
    }
  );
  // console.log("customJWT", customJWT);

  // set the JWT as an HTTP-Only Cookie
  res.cookie("customJWT", customJWT, {
    httpOnly: true, // set the cookie as HTTP-Only
    secure: false, // enable "secure" to use HTTPS
    sameSite: "none", // "sameSite" determines how the cookie is sent with Cross-Origin Requests "strict" | "lax" | "none"
    maxAge: 3600000 // set expiry of 1 hour to match the customJWT
  });

  // because we cannot access the HTTP-Only Cookie on the frontend
  // we need to send another Cookie with Non-Sensitive User Information
  const userCookieData = {
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };

  res.cookie("user", userCookieData, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
    maxAge: 3600000
  });

  // redirect to the frontend (with the Cookies)
  res.redirect(`http://localhost:3000/`);
};

export const accessTokenHandler = async (req: Request, res: Response) => {
  // get the ACCESS TOKEN from the Request Headers
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  // console.log("accessTokenHandler accessToken:", accessToken);

  // verify the ACCESS TOKEN
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
  );
  // console.log("accessTokenHandler response", response);

  const data = await response.json();
  console.log("accessTokenHandler data", data);

  // return the ACCESS TOKEN data
  res.json({ accessTokenData: data });
};
