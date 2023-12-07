import { disconnectFromDatabase } from "../helpers/database";
import { getAllUsers, createUser, getUserById } from "../../helpers/users";
import { cleanAll } from "../helpers/dbCleaner";

describe("Users", () => {
  let userId: number;

  beforeEach(async () => {
    await cleanAll();
    const user = await createUser({
      googleId: "0123456789",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@gmail.com"
    });
    userId = user[0].id;
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  test("Should receive one record with getAllUsers", async () => {
    expect((await getAllUsers()).length).toBe(1);
  });

  test("Should receive one record with getUserById", async () => {
    const result = await getUserById(userId);
    expect(result.length).toBe(1);
  });

  test("The userId should be same as the id from getUserById", async () => {
    expect((await getUserById(userId))[0].id).toStrictEqual(userId);
  });

  test("The userId should be same as the id from getAllUsers", async () => {
    expect((await getAllUsers())[0].id).toStrictEqual(userId);
  });
});
