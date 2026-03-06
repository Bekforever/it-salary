import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const Statistics = pgTable('statistics', {
  id: uuid('id').defaultRandom().primaryKey(),
  city: varchar('city').notNull(),
  experience: varchar('experience').notNull(),
  position: varchar('position').notNull(),
  salary: varchar('salary').notNull(),
})
