import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const User = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  city: uuid('city').notNull(),
  experience: uuid('experience').notNull(),
  position: uuid('position').notNull(),
  salary: varchar('salary', { length: 255 }).notNull(),
})
