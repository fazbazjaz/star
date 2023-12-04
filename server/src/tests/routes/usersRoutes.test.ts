import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import { app } from "../../app";
import { disconnectFromDatabase } from "../helpers/database";
import { createUser } from "../../helpers/users";
import { cleanAll } from "../helpers/dbCleaner";
import { CustomJWTPayload } from "../../types/types";
import { SelectUserType } from "../../database/schema";

describe("User Routes", () => {
  const request = supertest(app);

  beforeEach(async () => {
    await cleanAll();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  describe("/api/users GET", () => {
    it("returns 401 error when no customJWT is provided", async () => {
      const response = await request.get("/api/users");

      expect(response.statusCode).toBe(401);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual({
        error: "Authorization Header Missing or Invalid"
      });
    });

    it("returns 200 JSON Response with an Array of Users when a Valid JWT is provided", async () => {
      // Create the First User
      const user = await createUser({
        googleId: "0123456789",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@gmail.com",
        picture: "test.com/bob.png"
      });

      // Create The Second User
      await createUser({
        googleId: "9876543210",
        firstName: "Ben",
        lastName: "Smith",
        email: "ben@gmail.com",
        picture: "test.com/ben.png"
      });

      // Get the First User's ID
      const createdUserId = user[0].id;

      const customJWTPayload: CustomJWTPayload = {
        id: createdUserId,
        googleId: "0123456789"
      };

      const customJWT = jwt.sign(
        customJWTPayload,
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: "1h"
        }
      );

      const response = await request
        .get("/api/users")
        .set("Authorization", `Bearer ${customJWT}`);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toBeInstanceOf(Array);

      if (response.body.length > 0) {
        response.body.forEach((user: SelectUserType) => {
          expect(user.id).toBeDefined();
          expect(typeof user.id).toBe("number");

          expect(user.googleId).toBeDefined();
          expect(typeof user.googleId).toBe("string");

          expect(user.firstName).toBeDefined();
          expect(typeof user.firstName).toBe("string");

          expect(user.lastName).toBeDefined();
          expect(typeof user.lastName).toBe("string");

          expect(user.email).toBeDefined();
          expect(typeof user.email).toBe("string");

          expect(user.picture).toBeDefined();
          expect(typeof user.picture).toBe("string");

          expect(user.createdAt).toBeDefined();
          expect(typeof user.createdAt).toBe("string");

          expect(user.updatedAt).toBeDefined();
          expect(typeof user.updatedAt).toBe("string");
        });
      }
    });
  });

  describe("/api/users/:id GET", () => {
    it("returns 401 error when no JWT is provided from an HTTP-Only Cookie", async () => {
      const response = await request.get("/api/users/1");

      expect(response.statusCode).toBe(401);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual({
        error: "Authorization Header Missing or Invalid"
      });
    });

    it("returns 200 JSON Response with a Single User when a Valid JWT is provided", async () => {
      const user = await createUser({
        googleId: "0123456789",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@gmail.com",
        picture: "test.com/bob.png"
      });

      const createdUserId = user[0].id;

      const customJWTPayload: CustomJWTPayload = {
        id: createdUserId,
        googleId: "0123456789"
      };

      const customJWT = jwt.sign(
        customJWTPayload,
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: "1h"
        }
      );

      const response = await request
        .get(`/api/users/${createdUserId}`)
        .set("Authorization", `Bearer ${customJWT}`);

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toBeInstanceOf(Object);

      if (response.body) {
        const user: SelectUserType = response.body;

        expect(user.id).toBeDefined();
        expect(typeof user.id).toBe("number");

        expect(user.googleId).toBeDefined();
        expect(typeof user.googleId).toBe("string");

        expect(user.firstName).toBeDefined();
        expect(typeof user.firstName).toBe("string");

        expect(user.lastName).toBeDefined();
        expect(typeof user.lastName).toBe("string");

        expect(user.email).toBeDefined();
        expect(typeof user.email).toBe("string");

        expect(user.picture).toBeDefined();
        expect(typeof user.picture).toBe("string");

        expect(user.createdAt).toBeDefined();
        expect(typeof user.createdAt).toBe("string");

        expect(user.updatedAt).toBeDefined();
        expect(typeof user.updatedAt).toBe("string");
      }
    });
  });
});
