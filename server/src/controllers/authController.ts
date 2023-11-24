import { OAuth2Client } from "google-auth-library";
import jwt, { Secret } from "jsonwebtoken";
import { database } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { CustomJWTPayload, UserCookie } from "../types/types";

export const idTokenHandler = async (req: Request, res: Response) => {
  // Initialise a new OAuth2.0 Client
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

  // Get the ID TOKEN from the Request Headers
  const idToken = jwtTokenParts[1];
  // console.log("idToken:", idToken);

  // Verify the ID TOKEN
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

  // Get the PAYLOAD from the ID TOKEN
  const idTokenPayload = verifyIdToken.getPayload();
  // console.log("idTokenPayload:", idTokenPayload);

  if (!idTokenPayload) {
    return res.status(401).json({ error: "Invalid ID Token Payload" });
  }

  // Get the User Information from the ID TOKEN PAYLOAD
  const userGoogleId = idTokenPayload.sub; // fix these typing issues later
  const userFirstname = idTokenPayload.given_name;
  const userLastname = idTokenPayload.family_name;
  const userEmail = idTokenPayload.email;
  const userPicture = idTokenPayload.picture;

  let user;

  // Check if there is an Existing User with the same Google ID
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

  // If there is no Existing User with that Google ID, create a New User
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

  // Get the userId from the previous Database Query
  const userId = user[0].id;

  // Prepare a Payload for our own custom JWT with User information
  const customJWTPayload: CustomJWTPayload = {
    id: userId,
    google_id: userGoogleId
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

  // Create an HTTP-Only Cookie containing the custom JWT
  res.cookie("customJWT", customJWT, {
    httpOnly: true, // set the cookie as HTTP-Only
    secure: true, // enable "secure" to use HTTPS
    sameSite: "none", // "sameSite" determines how the cookie is sent with Cross-Origin Requests "strict" | "lax" | "none"
    maxAge: 3600000 // set expiry of 1 hour to match the customJWT
  });

  // Because we cannot access the HTTP-Only Cookie on the frontend
  // We need to send another Cookie with User Data
  const userCookie: UserCookie = {
    id: userId,
    google_id: userGoogleId,
    firstname: userFirstname,
    lastname: userLastname,
    email: userEmail,
    picture: userPicture
  };

  res.cookie("user", userCookie, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 3600000
  });

  // Respond with the Two Cookies
  res.status(200).send();
};
