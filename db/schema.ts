import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  phone: bigint('phone', { mode: 'number' }),
});

export const interests = pgTable('interests', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const clientInterests = pgTable(
  'client_interests',
  {
    clientId: integer('client_id')
      .notNull()
      .references(() => clients.id, {
        onDelete: 'cascade',
      }),
    interestId: integer('interest_id')
      .notNull()
      .references(() => interests.id, {
        onDelete: 'cascade',
      }),
  },
  t => ({
    pk: primaryKey({ columns: [t.clientId, t.interestId] }),
  })
);

export const clientsRelations = relations(clients, ({ many }) => ({
  interests: many(clientInterests),
}));

export const interestsRelations = relations(interests, ({ many }) => ({
  clients: many(clientInterests),
}));

export const clientInterestsRelations = relations(clientInterests, ({ one }) => ({
  client: one(clients, {
    fields: [clientInterests.clientId],
    references: [clients.id],
  }),
  interest: one(interests, {
    fields: [clientInterests.interestId],
    references: [interests.id],
  }),
}));
