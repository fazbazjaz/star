import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";

// User Types
export type SelectUserType = InferSelectModel<typeof users>;
export type InsertUserType = InferInsertModel<typeof users>;

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  google_id: varchar("google_id").unique(),
  firstname: varchar("firstname"),
  lastname: varchar("lastname"),
  email: varchar("email").unique(),
  picture: varchar("picture"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

// Relation for Users Table
export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions)
}));

// Questions Table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  question: text("question").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Questions Table
// This is the connection between the Questions Table and Users Table
// Each Question can only have one User
// We make a Relation and a Foreign Key Constraint
export const questionsRelations = relations(questions, ({ one, many }) => ({
  user: one(users, {
    fields: [questions.userId],
    references: [users.id]
  }),
  answers: many(answers)
}));

// Answers Table
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id")
    .references(() => questions.id, { onDelete: "cascade" })
    .notNull(),
  situation: text("situation").notNull(),
  task: text("task").notNull(),
  action: text("action").notNull(),
  result: text("result").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Answers Table
export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id]
  })
}));

// Comments Table
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  answerId: integer("answer_id")
    .references(() => answers.id, { onDelete: "cascade" })
    .notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Relations for Comments Table
export const commentsRelations = relations(comments, ({ one }) => ({
  answer: one(answers, {
    fields: [comments.answerId],
    references: [answers.id]
  })
}));
