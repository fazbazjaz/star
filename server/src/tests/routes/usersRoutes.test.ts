import supertest from "supertest";
import jwt, { Secret } from "jsonwebtoken";
import { app } from "../../app";
import { disconnectFromDatabase } from "../helpers/database";
import { deleteAllUsers, createUser } from "../helpers/users";
import { CustomJWTPayload } from "../../types/types";
import { SelectUserType } from "../../database/schema";

const request = supertest(app);

beforeEach(async () => {
  await deleteAllUsers();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

describe("/api/users GET", () => {
  it("returns 200 JSON response with message", async () => {
    const response = await request.get("/api/users");

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      message: "STAR Server /api/users/ Users Route"
    });
  });
});

describe("/api/users/all GET", () => {
  it("returns 401 error when no JWT is provided from an HTTP-Only Cookie", async () => {
    const response = await request.get("/api/users/all");

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      error: "Unauthorized - No Cookie with JWT Provided"
    });
  });

  it("returns 200 JSON Response with an Array of Users when a Valid JWT is provided", async () => {
    await createUser({
      google_id: "0123456789",
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@gmail.com",
      picture: "test.com/bob.png"
    });

    await createUser({
      google_id: "9876543210",
      firstname: "Ben",
      lastname: "Smith",
      email: "ben@gmail.com",
      picture: "test.com/ben.png"
    });

    const customJWTPayload: CustomJWTPayload = {
      google_id: "0123456789",
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@gmail.com",
      picture: "test.com/bob.png"
    };

    const customJWT = jwt.sign(
      customJWTPayload,
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1h"
      }
    );

    const response = await request
      .get("/api/users/all")
      .set("Cookie", `customJWT=${customJWT}`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    if (response.body.length > 0) {
      response.body.forEach((user: SelectUserType) => {
        expect(user.id).toBeDefined();
        expect(typeof user.id).toBe("number");

        expect(user.google_id).toBeDefined();
        expect(typeof user.google_id).toBe("string");

        expect(user.firstname).toBeDefined();
        expect(typeof user.firstname).toBe("string");

        expect(user.lastname).toBeDefined();
        expect(typeof user.lastname).toBe("string");

        expect(user.email).toBeDefined();
        expect(typeof user.email).toBe("string");

        expect(user.picture).toBeDefined();
        expect(typeof user.picture).toBe("string");

        expect(user.created_at).toBeDefined();
        expect(typeof user.created_at).toBe("string");

        expect(user.updated_at).toBeDefined();
        expect(typeof user.updated_at).toBe("string");
      });
    }
  });
});

describe("/api/users/id/1 GET", () => {
  it("returns 401 error when no JWT is provided from an HTTP-Only Cookie", async () => {
    const response = await request.get("/api/users/id/1");

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      error: "Unauthorized - No Cookie with JWT Provided"
    });
  });

  it("returns 200 JSON Response with a Single User when a Valid JWT is provided", async () => {
    const user = await createUser({
      google_id: "0123456789",
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@gmail.com",
      picture: "test.com/bob.png"
    });

    const createdUserId = user[0].id;

    const customJWTPayload: CustomJWTPayload = {
      google_id: "0123456789",
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@gmail.com",
      picture: "test.com/bob.png"
    };

    const customJWT = jwt.sign(
      customJWTPayload,
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1h"
      }
    );

    const response = await request
      .get(`/api/users/id/${createdUserId}`)
      .set("Cookie", `customJWT=${customJWT}`);

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Object);

    if (response.body) {
      const user = response.body;

      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe("number");

      expect(user.google_id).toBeDefined();
      expect(typeof user.google_id).toBe("string");

      expect(user.firstname).toBeDefined();
      expect(typeof user.firstname).toBe("string");

      expect(user.lastname).toBeDefined();
      expect(typeof user.lastname).toBe("string");

      expect(user.email).toBeDefined();
      expect(typeof user.email).toBe("string");

      expect(user.picture).toBeDefined();
      expect(typeof user.picture).toBe("string");

      expect(user.created_at).toBeDefined();
      expect(typeof user.created_at).toBe("string");

      expect(user.updated_at).toBeDefined();
      expect(typeof user.updated_at).toBe("string");
    }
  });
});
