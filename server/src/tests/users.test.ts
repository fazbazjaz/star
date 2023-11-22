import { createUser, getAllUsers, findUserById } from "../helpers/users";
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
    google_id: "0123456789",
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail.com"
  });

  expect((await getAllUsers()).length).toBe(1);
});

test("findUserById", async () => {
  const user = await createUser({
    google_id: "0123456789",
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail.com"
  });
  const result = await findUserById(user[0].id);
  expect(result.length).toBe(1);
});
