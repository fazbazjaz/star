import { cleanAll } from "./helpers/dbCleaner";
import { createUser } from "../helpers/users";
import { disconnectFromDatabase } from "../helpers/database";
import { createQuestion, getAllQuestions } from "../helpers/questions";
import { InsertUserType } from "../database/schema";

let user: InsertUserType[];

beforeEach(async () => {
  await cleanAll();

  user = await createUser({
    google_id: "012345689",
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@gmail2.com"
  });
});

afterAll(async () => {
  await disconnectFromDatabase();
});

test("createQuestion", async () => {
  await createQuestion(user[0].id as number, "This is a question");
  expect((await getAllQuestions()).length).toBe(1);
});
