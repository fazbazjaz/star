import { createUser } from "../helpers/users";
import { createQuestion, getAllQuestions } from "../helpers/questions";
import { disconnectFromDatabase } from "../helpers/database";
import { cleanAll } from "./helpers/dbCleaner";

let user: { id: number }[];
beforeEach(async () => {
  await cleanAll();
  user = await createUser({
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail2.com"
  });
});

afterAll(async () => {
  await disconnectFromDatabase();
});

test("createQuestion", async () => {
  await createQuestion(user[0].id, "This is a question");
  expect((await getAllQuestions()).length).toBe(1);
});
