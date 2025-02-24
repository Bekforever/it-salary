import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const Position = pgTable('position', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
})
