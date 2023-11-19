import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  google_id: varchar('google_id').unique(),
  firstname: varchar('firstname'),
  lastname: varchar('lastname'),
  email: varchar('email').unique(),
  picture: varchar('picture'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});
