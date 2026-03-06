import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const Company = pgTable('company', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
})
