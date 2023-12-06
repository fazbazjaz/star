import { disconnectFromDatabase } from "../helpers/database";
import {
  createQuestion,
  getQuestionsByPage,
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
      googleId: "012345689",
      firstName: "Bob",
      lastName: "Smith",
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
    const question = await getOneQuestion(questionId);
    expect(question).toBeInstanceOf(Object);
    expect(question?.id).toBeDefined();
    expect(typeof question?.id).toBe("number");
  });

  test("The questionId should be same as the id from getOneQuestion", async () => {
    expect((await getOneQuestion(questionId))!.id).toStrictEqual(questionId);
  });

  test("The questionId should be same as the id from getAllQuestion", async () => {
    expect((await getQuestionsByPage(5, 1, "popular"))[0].id).toStrictEqual(
      questionId
    );
  });

  test("The question should be same as the question from getOneQuestion", async () => {
    expect((await getOneQuestion(questionId))!.question).toStrictEqual(
      question
    );
  });

  test("The question should be same as the question from getAllQuestion", async () => {
    expect((await getOneQuestion(questionId))!.question).toStrictEqual(
      question
    );
  });

  test("The question from getOneQuestion should be 'This is a question'", async () => {
    expect((await getOneQuestion(questionId))!.question).toStrictEqual(
      "This is a question"
    );
  });

  test("The question from getQuestionsByPage should be 'This is a question'", async () => {
    expect(
      (await getQuestionsByPage(5, 1, "popular"))[0].question
    ).toStrictEqual("This is a question");
  });
});
