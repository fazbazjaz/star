import supertest from "supertest";
import { cleanAll } from "../helpers/dbCleaner";
import { disconnectFromDatabase } from "../helpers/database";
import { app } from "../../app";

describe("API Routes", () => {
  const request = supertest(app);

  beforeEach(async () => {
    await cleanAll();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  describe("/api GET", () => {
    it("returns 200 JSON response with message", async () => {
      const response = await request.get("/");

      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual({
        message: "STAR Server / Root Route"
      });
    });
  });
});
