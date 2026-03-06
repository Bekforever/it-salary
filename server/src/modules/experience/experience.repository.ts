import { eq } from 'drizzle-orm'

import db from '../../db/connection'
import { Experience } from './experience.model'

export async function findAllExperiences() {
  return db.select().from(Experience)
}

export async function findExperienceById(id: string) {
  const result = await db.select().from(Experience).where(eq(Experience.id, id))
  return result[0] ?? null
}

export async function createExperience(name: string) {
  const [result] = await db.insert(Experience).values({ name }).returning()
  return result
}

export async function updateExperience(id: string, name: string) {
  const [result] = await db.update(Experience).set({ name }).where(eq(Experience.id, id)).returning()
  return result
}

export async function deleteExperience(id: string) {
  await db.delete(Experience).where(eq(Experience.id, id))
}
