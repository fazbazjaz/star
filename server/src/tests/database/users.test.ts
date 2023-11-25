import { disconnectFromDatabase } from "../../helpers/database";
import { getAllUsers, createUser, findUserById } from "../../helpers/users";
import { cleanAll } from "../helpers/dbCleaner";

describe("Users", () => {
  let userId: number;

  beforeEach(async () => {
    await cleanAll();
    const user = await createUser({
      google_id: "0123456789",
      firstname: "Bob",
      lastname: "Smith",
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

  test("Should receive one record with findUserById", async () => {
    const result = await findUserById(userId);
    expect(result.length).toBe(1);
  });

  test("The userId should be same as the id from findUserById", async () => {
    expect((await findUserById(userId))[0].id).toStrictEqual(userId);
  });

  test("The userId should be same as the id from getAllUsers", async () => {
    expect((await getAllUsers())[0].id).toStrictEqual(userId);
  });
});
