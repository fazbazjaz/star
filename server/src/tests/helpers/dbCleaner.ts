import { database } from "../../database/connection";
import { users, questions } from "../../database/schema";

export const deleteAllQuestions = async () => {
  await database.delete(questions);
};

export const deleteAllUsers = async () => {
  await database.delete(users);
};

export const cleanAll = async () => {
  await deleteAllQuestions();
  await deleteAllUsers();
};
