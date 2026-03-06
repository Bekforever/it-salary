import { RequestHandler } from 'express'

import * as statisticsService from './statistics.service'

export const getAllStatistics: RequestHandler = async (req, res) => {
  const { city, experience, position } = req.query

  try {
    const [message, whereClause] = await Promise.all([
      statisticsService.getFilterMessage(city as string, experience as string, position as string),
      Promise.resolve(
        statisticsService.buildWhereClause(
          city as string,
          experience as string,
          position as string,
        ),
      ),
    ])

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
      statisticsService.getUsersByPosition(whereClause),
      statisticsService.getUsersByExperience(whereClause),
      statisticsService.getUsersByCompany(whereClause),
      statisticsService.getUsersByLocation(whereClause),
      statisticsService.getTotalUsers(whereClause),
      statisticsService.getUsersByCity(whereClause),
      statisticsService.getSalaryStatistics(whereClause),
      statisticsService.getSalaryByCity(whereClause),
      statisticsService.getSalaryByPosition(whereClause),
      statisticsService.getSalaryByExperience(whereClause),
      statisticsService.getSalaryByCompany(whereClause),
      statisticsService.getSalaryByLocation(whereClause),
    ])

    res.json({
      data: {
        users: { totalUsers, usersByCity, usersByPosition, userByExperience, usersByCompany, usersByLocation },
        salaries: { total: salaries, salaryByCity, salaryByPosition, salaryByExperience, salaryByCompany, salaryByLocation },
      },
      message,
    })
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
    res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
}
