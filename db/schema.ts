import { bigint, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  phone: bigint('phone', { mode: 'number' }),
  interests: text('interests'),
});
