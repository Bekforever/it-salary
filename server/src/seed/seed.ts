import { sql } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'path'
import db from '../db/schema'
import { seedCity } from './city.seed'
import { seedCompany } from './company.seed'
import { seedExperience } from './experience.seed'
import { seedLocation } from './location.seed'
import { seedPosition } from './position.seed'
import { seedUsers } from './users.seed'

export const seed = async () => {
  // Ensure all tables exist by running pending migrations first
  const migrationsFolder = path.resolve(__dirname, '../../drizzle')
  console.log('Running migrations from', migrationsFolder)
  await migrate(db, { migrationsFolder })
  console.log('Migrations completed')

  // Fallback: ensure required columns exist (if migrator did not apply)
  await db.execute(sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "company" uuid`)
  await db.execute(sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "location" uuid`)

  await seedCity()
  await seedCompany()
  await seedExperience()
  await seedLocation()
  await seedPosition()
  await seedUsers()
}

seed()
