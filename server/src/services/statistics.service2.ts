import db from '../db/schema'
import { User } from '../db/user.model'
import { City } from '../db/city.model'
import { Experience } from '../db/experience.model'
import { Position } from '../db/position.model'
import { sql } from 'drizzle-orm'

class StatisticsService {
  async getUsersByCity() {
    return db
      .select({
        city: City.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(City, sql`${User.city} = ${City.id}`)
      .groupBy(City.name)
  }

  async getUsersByPosition() {
    return db
      .select({
        position: Position.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(Position, sql`${User.position} = ${Position.id}`)
      .groupBy(Position.name)
  }

  async getUsersByExperience() {
    return db
      .select({
        experience: Experience.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(Experience, sql`${User.experience} = ${Experience.id}`)
      .groupBy(Experience.name)
  }

  async getTopPositionsByCity() {
    return db
      .select({
        city: City.name,
        position: Position.name,
        count: sql<number>`COUNT(*)`,
      })
      .from(User)
      .leftJoin(City, sql`${User.city} = ${City.id}`)
      .leftJoin(Position, sql`${User.position} = ${Position.id}`)
      .groupBy(City.name, Position.name)
      .orderBy(sql`COUNT(*) DESC`)
  }
}

export default new StatisticsService()
