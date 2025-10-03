import db from '../db/schema'
import { User } from '../db/user.model'
import { City } from '../db/city.model'
import { Experience } from '../db/experience.model'
import { Position } from '../db/position.model'
import { eq, and, sql } from 'drizzle-orm'
import { Company } from '../db/company.model'
import { Location } from '../db/location.model'

class StatisticsService {
  buildWhereClause(city?: string, experience?: string, position?: string) {
    const conditions = []

    if (city) {
      conditions.push(eq(User.city, city))
    }

    if (experience) {
      conditions.push(eq(User.experience, experience))
    }

    if (position) {
      conditions.push(eq(User.position, position))
    }

    return conditions.length > 0 ? and(...conditions) : sql`TRUE`
  }

  async getFilterMessage(city?: string, experience?: string, position?: string): Promise<string> {
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

  async getTotalUsers(whereClause: any) {
    const result = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(User)
      .where(whereClause)

    return Number(result[0]?.count || 0)
  }

  async getUsersByCity(whereClause: any) {
    return await db
      .select({
        city: City.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(City, eq(User.city, City.id))
      .where(whereClause)
      .groupBy(City.name)
  }

  async getUsersByPosition(whereClause: any) {
    return await db
      .select({
        position: Position.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(Position, eq(User.position, Position.id))
      .where(whereClause)
      .groupBy(Position.name)
  }

  async getUsersByExperience(whereClause: any) {
    return await db
      .select({
        experience: Experience.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(Experience, eq(User.experience, Experience.id))
      .where(whereClause)
      .groupBy(Experience.name)
  }

  async getUsersByCompany(whereClause: any) {
    return await db
      .select({
        company: Company.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(Company, eq(User.company, Company.id))
      .where(whereClause)
      .groupBy(Company.name)
  }

  async getUsersByLocation(whereClause: any) {
    return await db
      .select({
        location: Location.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(Location, eq(User.location, Location.id))
      .where(whereClause)
      .groupBy(Location.name)
  }

  async getSalaryStatistics(whereClause: any) {
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

  async getSalaryByCity(whereClause: any) {
    return await db
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

  async getSalaryByPosition(whereClause: any) {
    return await db
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

  async getSalaryByExperience(whereClause: any) {
    return await db
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

  async getSalaryByCompany(whereClause: any) {
    return await db
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

  async getSalaryByLocation(whereClause: any) {
    return await db
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
}

export default new StatisticsService()
