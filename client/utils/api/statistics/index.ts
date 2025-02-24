import { http } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'
import { TStatistics, TStatisticsFilters } from './types'
import { ResponseWithMsg } from '@/utils/lib/types'

export async function getStatistics(params: Partial<TStatisticsFilters>) {
  const { data } = await http<ResponseWithMsg<TStatistics>>(
    queryRoutes.statistics.getAll,
    {
      params,
    },
  )
  return data
}
