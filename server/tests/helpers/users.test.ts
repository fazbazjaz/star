import * as UsersHelper from "../../src/helpers/users";

beforeEach(async () => {
  await UsersHelper.truncateUsers();
});

test("createUser", async () => {
  await UsersHelper.createUser({
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail.com"
  });

  expect((await UsersHelper.getAllUser()).length).toBe(1);
});
