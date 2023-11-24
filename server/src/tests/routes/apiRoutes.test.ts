import supertest from "supertest";
import { createUser } from "../../helpers/users";
import { createQuestion } from "../../helpers/questions";
import { cleanAll } from "../helpers/dbCleaner";
import { disconnectFromDatabase } from "../../helpers/database";
import {app} from "../../app";
import {createAppWithQuestionRoutes} from "../helpers/appFactory";

const request = supertest(app);

beforeEach(async () => {
  await cleanAll();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

describe("/api GET", () => {
  it("returns 200 JSON response with message", async () => {
    const response = await request.get("/api");

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({
      message: "STAR Server /api API Route"
    });
  });
});

describe("", () => {
  test("findOneQuestion when the question Id doesn't exist", async () => {
    let app = createAppWithQuestionRoutes()
    const request = supertest(app);

    const response = await request.get("/api/questions/7700432");
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({ error: "No Question Found!" });
  });



  test("findOneQuestion when the question id does exist", async () => {
    let app = createAppWithQuestionRoutes()
    const request = supertest(app);
    const user = await createUser({
      google_id: "012345689",
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@gmail2.com"
    });

    const question = await createQuestion(user[0].id, "This is a question");

    const questionId = question[0].id;
    const url = `/api/questions/${questionId}`;
    const response = await request.get(url);
    expect(response.statusCode).toBe(200);
  });
});
