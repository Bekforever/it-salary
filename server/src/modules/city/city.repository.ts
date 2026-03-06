import { eq } from 'drizzle-orm'

import db from '../../db/connection'
import { City } from './city.model'

export async function findAllCities() {
  return db.select().from(City)
}

export async function findCityById(id: string) {
  const result = await db.select().from(City).where(eq(City.id, id))
  return result[0] ?? null
}

export async function findCityByName(name: string) {
  const result = await db.select().from(City).where(eq(City.name, name))
  return result[0] ?? null
}

export async function createCity(name: string) {
  const [result] = await db.insert(City).values({ name }).returning()
  return result
}

export async function updateCity(id: string, name: string) {
  const [result] = await db.update(City).set({ name }).where(eq(City.id, id)).returning()
  return result
}

export async function deleteCity(id: string) {
  await db.delete(City).where(eq(City.id, id))
}
