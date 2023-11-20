import { deleteAllUsers, createUser, getAllUsers } from "./helpers/users";
import { disconnectFromDatabase } from "./helpers/database";

beforeEach(async () => {
  await deleteAllUsers();
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
