import { disconnectFromDatabase } from "../../helpers/database";
import {
  createQuestion,
  getAllQuestions,
  getOneQuestion
} from "../../helpers/questions";
import { createUser } from "../../helpers/users";
import { cleanAll } from "../helpers/dbCleaner";

describe("Get From Questions Table", () => {
  let questionId: number;
  let question: string;

  beforeEach(async () => {
    await cleanAll();
    const user = await createUser({
      google_id: "012345689",
      firstname: "Bob",
      lastname: "Smith",
      email: "bob@gmail2.com"
    });

    const data = await createQuestion(user[0].id, "This is a question");
    questionId = data[0].id;
    question = data[0].question;
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  test("Should receive one record", async () => {
    expect((await getOneQuestion(questionId)).length).toStrictEqual(1);
  });

  test("The questionId should be same as the id from getOneQuestion", async () => {
    expect((await getOneQuestion(questionId))[0].id).toStrictEqual(questionId);
  });

  test("The questionId should be same as the id from getAllQuestion", async () => {
    expect((await getAllQuestions())[0].id).toStrictEqual(questionId);
  });

  test("The question should be same as the question from getOneQuestion", async () => {
    expect((await getOneQuestion(questionId))[0].question).toStrictEqual(
      question
    );
  });

  test("The question should be same as the question from getAllQuestion", async () => {
    expect((await getOneQuestion(questionId))[0].question).toStrictEqual(
      question
    );
  });

  test("The question from getOneQuestion should be 'This is a question'", async () => {
    expect((await getOneQuestion(questionId))[0].question).toStrictEqual(
      "This is a question"
    );
  });

  test("The question from getAllQuestions should be 'This is a question'", async () => {
    expect((await getAllQuestions())[0].question).toStrictEqual(
      "This is a question"
    );
  });
});
