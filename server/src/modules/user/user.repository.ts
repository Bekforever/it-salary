import { eq, sql } from 'drizzle-orm'

import db from '../../db/connection'
import { City } from '../city/city.model'
import { Company } from '../company/company.model'
import { Experience } from '../experience/experience.model'
import { Location } from '../location/location.model'
import { Position } from '../position/position.model'
import { User } from './user.model'

export async function findAllUsers() {
  return db
    .select({
      id: User.id,
      email: User.email,
      role: User.role,
      salary: User.salary,
      city: { name: City.name, id: City.id },
      position: { name: Position.name, id: Position.id },
      experience: { name: Experience.name, id: Experience.id },
      company: { name: Company.name, id: Company.id },
      location: { name: Location.name, id: Location.id },
    })
    .from(User)
    .leftJoin(City, sql`${User.city} = ${City.id}`)
    .leftJoin(Position, sql`${User.position} = ${Position.id}`)
    .leftJoin(Experience, sql`${User.experience} = ${Experience.id}`)
    .leftJoin(Company, sql`${User.company} = ${Company.id}`)
    .leftJoin(Location, sql`${User.location} = ${Location.id}`)
}

export async function findUserById(id: string) {
  const result = await db.select().from(User).where(eq(User.id, id))
  return result[0] ?? null
}

export async function findUserByEmail(email: string) {
  const result = await db.select().from(User).where(eq(User.email, email))
  return result[0] ?? null
}

export async function createUser(data: {
  email: string
  password: string
  city: string
  role: string
  experience: string
  position: string
  salary: string
  company?: string
  location?: string
}) {
  const [result] = await db.insert(User).values(data).returning()
  return result
}

export async function updateUser(id: string, data: Record<string, any>) {
  const [result] = await db.update(User).set(data).where(eq(User.id, id)).returning()
  return result
}

export async function deleteUser(id: string) {
  await db.delete(User).where(eq(User.id, id))
}
