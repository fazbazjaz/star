import { createUser, getAllUsers, getUserById } from "../helpers/users";
import { disconnectFromDatabase } from "../helpers/database";
import { cleanAll } from "./helpers/dbCleaner";

describe("Users", () => {
  beforeEach(async () => {
    await cleanAll();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  test("createUser", async () => {
    await createUser({
      googleId: "0123456789",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@gmail.com"
    });
    expect((await getAllUsers()).length).toBe(1);
  });

  test("getUserById", async () => {
    const user = await createUser({
      googleId: "0123456789",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@gmail.com"
    });
    const result = await getUserById(user[0].id);
    expect(result.length).toBe(1);
  });
});
