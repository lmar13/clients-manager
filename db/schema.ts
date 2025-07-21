import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull().default(''),
});
