import { Request, RequestHandler, Response } from 'express'
import db from '../db/schema'
import { User } from '../db/user.model'
import { City } from '../db/city.model'
import { Experience } from '../db/experience.model'
import { Position } from '../db/position.model'
import { eq, and, sql } from 'drizzle-orm'

class StatisticsController {
  getAllStatistics: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { city, experience, position } = req.query

      let conditions = []
      let message = 'Статистика'

      try {
        if (city) {
          conditions.push(eq(User.city, city as string))
          const cityData = await db
            .select()
            .from(City)
            .where(eq(City.id, city as string))
          message += ` по городу ${cityData[0]?.name || 'неизвестный город'}`
        }

        if (experience) {
          conditions.push(eq(User.experience, experience as string))
          const experienceData = await db
            .select()
            .from(Experience)
            .where(eq(Experience.id, experience as string))
          message += `, с опытом ${experienceData[0]?.name || 'неизвестный опыт'}`
        }

        if (position) {
          conditions.push(eq(User.position, position as string))
          const positionData = await db
            .select()
            .from(Position)
            .where(eq(Position.id, position as string))
          message += `, на должности ${positionData[0]?.name || 'неизвестная должность'}`
        }
      } catch (error) {
        console.error('Ошибка при получении справочных данных:', error)
        return res
          .status(400)
          .json({ message: 'Ошибка при обработке параметров (город, опыт, должность)', error })
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : sql`TRUE`

      let totalUsers
      let usersByCity
      let salaries

      try {
        // Количество пользователей
        totalUsers = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(User)
          .where(whereClause)
      } catch (error) {
        console.error('Ошибка при получении общего количества пользователей:', error)
        return res
          .status(500)
          .json({ message: 'Ошибка при получении общего количества пользователей', error })
      }

      try {
        // Пользователи по городам
        usersByCity = await db
          .select({
            city: City.name,
            count: sql<number>`COUNT(*)`,
          })
          .from(User)
          .leftJoin(City, eq(User.city, City.id))
          .where(whereClause)
          .groupBy(City.name)
      } catch (error) {
        console.error('Ошибка при получении пользователей по городам:', error)
        return res.status(500).json({ message: 'Ошибка при получении пользователей по городам', error })
      }

      try {
        // Зарплаты
        salaries = await db
          .select({
            min: sql<number>`MIN(${User.salary}::numeric)`,
            max: sql<number>`MAX(${User.salary}::numeric)`,
            average: sql<number>`AVG(${User.salary}::numeric)`,
          })
          .from(User)
          .where(whereClause)
      } catch (error) {
        console.error('Ошибка при получении статистики зарплат:', error)
        return res.status(500).json({ message: 'Ошибка при получении статистики зарплат', error })
      }

      res.json({
        data: {
          users: {
            totalUsers: Number(totalUsers[0]?.count || 0),
            usersByCity,
          },
          salaries: {
            min: salaries[0]?.min || 0,
            max: salaries[0]?.max || 0,
            average: Math.floor(salaries[0]?.average || 0),
          },
        },
        message,
      })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ message: 'Внутренняя ошибка сервера', error })
    }
  }
}

export default new StatisticsController()
