import { eq } from 'drizzle-orm'

import db from '../../db/connection'
import { Position } from './position.model'

export async function findAllPositions() {
  return db.select().from(Position)
}

export async function findPositionById(id: string) {
  const result = await db.select().from(Position).where(eq(Position.id, id))
  return result[0] ?? null
}

export async function findPositionByName(name: string) {
  const result = await db.select().from(Position).where(eq(Position.name, name))
  return result[0] ?? null
}

export async function createPosition(name: string) {
  const [result] = await db.insert(Position).values({ name }).returning()
  return result
}

export async function updatePosition(id: string, name: string) {
  const [result] = await db.update(Position).set({ name }).where(eq(Position.id, id)).returning()
  return result
}

export async function deletePosition(id: string) {
  await db.delete(Position).where(eq(Position.id, id))
}
