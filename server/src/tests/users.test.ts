import { createUser, getAllUsers, findUserByGoogleId } from "../helpers/users";
import { disconnectFromDatabase } from "../helpers/database";
import { cleanAll } from "./helpers/dbCleaner";

beforeEach(async () => {
  await cleanAll();
});

afterAll(async () => {
  await disconnectFromDatabase();
});

test("createUser", async () => {
  await createUser({
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail.com"
  });

  expect((await getAllUsers()).length).toBe(1);
});

test("findUserByGoogleId", async () => {
  await createUser({
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail.com",
    google_id: "abc123"
  });
  const result: { id: number }[] = await findUserByGoogleId("abc123");
  expect(result.length).toBe(1);
});
