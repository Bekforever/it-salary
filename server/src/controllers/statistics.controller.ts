import { Request, RequestHandler, Response } from 'express'
import StatisticsService from '../services/statistics.service'

class StatisticsController {
  getAllStatistics: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { city, experience, position } = req.query

      try {
        // Формируем сообщение о примененных фильтрах
        const message = await StatisticsService.getFilterMessage(
          city as string,
          experience as string,
          position as string,
        )

        // Строим условие для фильтрации данных
        const whereClause = StatisticsService.buildWhereClause(
          city as string,
          experience as string,
          position as string,
        )

        // Получаем все необходимые данные
        const [
          usersByPosition,
          userByExperience,
          usersByCompany,
          usersByLocation,
          totalUsers,
          usersByCity,
          salaries,
          salaryByCity,
          salaryByPosition,
          salaryByExperience,
          salaryByCompany,
          salaryByLocation,
        ] = await Promise.all([
          StatisticsService.getUsersByPosition(whereClause),
          StatisticsService.getUsersByExperience(whereClause),
          StatisticsService.getUsersByCompany(whereClause),
          StatisticsService.getUsersByLocation(whereClause),
          StatisticsService.getTotalUsers(whereClause),
          StatisticsService.getUsersByCity(whereClause),
          StatisticsService.getSalaryStatistics(whereClause),
          StatisticsService.getSalaryByCity(whereClause),
          StatisticsService.getSalaryByPosition(whereClause),
          StatisticsService.getSalaryByExperience(whereClause),
          StatisticsService.getSalaryByCompany(whereClause),
          StatisticsService.getSalaryByLocation(whereClause),
        ])

        res.json({
          data: {
            users: {
              totalUsers,
              usersByCity,
              usersByPosition,
              userByExperience,
              usersByCompany,
              usersByLocation,
            },
            salaries: {
              total: salaries,
              salaryByCity,
              salaryByPosition,
              salaryByExperience,
              salaryByCompany,
              salaryByLocation,
            },
          },
          message,
        })
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
        res.status(500).json({ message: 'Ошибка при обработке данных', error })
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ message: 'Внутренняя ошибка сервера', error })
    }
  }
}

export default new StatisticsController()
