import { and, eq, sql } from 'drizzle-orm'

import db from '../../db/connection'
import { City } from '../city/city.model'
import { Company } from '../company/company.model'
import { Experience } from '../experience/experience.model'
import { Location } from '../location/location.model'
import { Position } from '../position/position.model'
import { User } from '../user/user.model'

export function buildWhereClause(city?: string, experience?: string, position?: string) {
  const conditions = []
  if (city) conditions.push(eq(User.city, city))
  if (experience) conditions.push(eq(User.experience, experience))
  if (position) conditions.push(eq(User.position, position))
  return conditions.length > 0 ? and(...conditions) : sql`TRUE`
}

export async function getFilterMessage(city?: string, experience?: string, position?: string) {
  let message = 'Статистика'

  if (city) {
    const cityData = await db.select().from(City).where(eq(City.id, city))
    message += ` по городу ${cityData[0]?.name || 'неизвестный город'}`
  }
  if (experience) {
    const experienceData = await db.select().from(Experience).where(eq(Experience.id, experience))
    message += `, с опытом ${experienceData[0]?.name || 'неизвестный опыт'}`
  }
  if (position) {
    const positionData = await db.select().from(Position).where(eq(Position.id, position))
    message += `, на должности ${positionData[0]?.name || 'неизвестная должность'}`
  }

  return message
}

export async function getTotalUsers(whereClause: any) {
  const result = await db.select({ count: sql<number>`COUNT(*)` }).from(User).where(whereClause)
  return Number(result[0]?.count || 0)
}

export async function getUsersByCity(whereClause: any) {
  return db
    .select({ city: City.name, count: sql<number>`COUNT(*)` })
    .from(User)
    .leftJoin(City, eq(User.city, City.id))
    .where(whereClause)
    .groupBy(City.name)
}

export async function getUsersByPosition(whereClause: any) {
  return db
    .select({ position: Position.name, count: sql<number>`COUNT(*)` })
    .from(User)
    .leftJoin(Position, eq(User.position, Position.id))
    .where(whereClause)
    .groupBy(Position.name)
}

export async function getUsersByExperience(whereClause: any) {
  return db
    .select({ experience: Experience.name, count: sql<number>`COUNT(*)` })
    .from(User)
    .leftJoin(Experience, eq(User.experience, Experience.id))
    .where(whereClause)
    .groupBy(Experience.name)
}

export async function getUsersByCompany(whereClause: any) {
  return db
    .select({ company: Company.name, count: sql<number>`COUNT(*)` })
    .from(User)
    .leftJoin(Company, eq(User.company, Company.id))
    .where(whereClause)
    .groupBy(Company.name)
}

export async function getUsersByLocation(whereClause: any) {
  return db
    .select({ location: Location.name, count: sql<number>`COUNT(*)` })
    .from(User)
    .leftJoin(Location, eq(User.location, Location.id))
    .where(whereClause)
    .groupBy(Location.name)
}

export async function getSalaryStatistics(whereClause: any) {
  const result = await db
    .select({
      min: sql<number>`MIN(${User.salary}::numeric)`,
      max: sql<number>`MAX(${User.salary}::numeric)`,
      average: sql<number>`AVG(${User.salary}::numeric)`,
    })
    .from(User)
    .where(whereClause)

  return {
    min: +result[0]?.min || 0,
    max: +result[0]?.max || 0,
    average: Math.floor(result[0]?.average || 0),
  }
}

export async function getSalaryByCity(whereClause: any) {
  return db
    .select({
      city: City.name,
      min: sql<number>`ROUND(MIN(${User.salary}::numeric))`,
      max: sql<number>`ROUND(MAX(${User.salary}::numeric))`,
      average: sql<number>`ROUND(AVG(${User.salary}::numeric))`,
    })
    .from(User)
    .leftJoin(City, eq(User.city, City.id))
    .where(whereClause)
    .groupBy(City.name)
}

export async function getSalaryByPosition(whereClause: any) {
  return db
    .select({
      position: Position.name,
      min: sql<number>`ROUND(MIN(${User.salary}::numeric))`,
      max: sql<number>`ROUND(MAX(${User.salary}::numeric))`,
      average: sql<number>`ROUND(AVG(${User.salary}::numeric))`,
    })
    .from(User)
    .leftJoin(Position, eq(User.position, Position.id))
    .where(whereClause)
    .groupBy(Position.name)
}

export async function getSalaryByExperience(whereClause: any) {
  return db
    .select({
      experience: Experience.name,
      min: sql<number>`ROUND(MIN(${User.salary}::numeric))`,
      max: sql<number>`ROUND(MAX(${User.salary}::numeric))`,
      average: sql<number>`ROUND(AVG(${User.salary}::numeric))`,
    })
    .from(User)
    .leftJoin(Experience, eq(User.experience, Experience.id))
    .where(whereClause)
    .groupBy(Experience.name)
}

export async function getSalaryByCompany(whereClause: any) {
  return db
    .select({
      company: Company.name,
      min: sql<number>`ROUND(MIN(${User.salary}::numeric))`,
      max: sql<number>`ROUND(MAX(${User.salary}::numeric))`,
      average: sql<number>`ROUND(AVG(${User.salary}::numeric))`,
    })
    .from(User)
    .leftJoin(Company, eq(User.company, Company.id))
    .where(whereClause)
    .groupBy(Company.name)
}

export async function getSalaryByLocation(whereClause: any) {
  return db
    .select({
      location: Location.name,
      min: sql<number>`ROUND(MIN(${User.salary}::numeric))`,
      max: sql<number>`ROUND(MAX(${User.salary}::numeric))`,
      average: sql<number>`ROUND(AVG(${User.salary}::numeric))`,
    })
    .from(User)
    .leftJoin(Location, eq(User.location, Location.id))
    .where(whereClause)
    .groupBy(Location.name)
}
