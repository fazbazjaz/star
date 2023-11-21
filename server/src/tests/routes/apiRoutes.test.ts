import supertest from "supertest";
import { app } from "../../app";

const request = supertest(app);

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
