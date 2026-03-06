import { eq } from 'drizzle-orm'

import db from '../../db/connection'
import { Location } from './location.model'

export async function findAllLocations() {
  return db.select().from(Location)
}

export async function findLocationById(id: string) {
  const result = await db.select().from(Location).where(eq(Location.id, id))
  return result[0] ?? null
}

export async function findLocationByName(name: string) {
  const result = await db.select().from(Location).where(eq(Location.name, name))
  return result[0] ?? null
}

export async function createLocation(name: string) {
  const [result] = await db.insert(Location).values({ name }).returning()
  return result
}

export async function updateLocation(id: string, name: string) {
  const [result] = await db.update(Location).set({ name }).where(eq(Location.id, id)).returning()
  return result
}

export async function deleteLocation(id: string) {
  await db.delete(Location).where(eq(Location.id, id))
}
