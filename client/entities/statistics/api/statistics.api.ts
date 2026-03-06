import { TStatistics, TStatisticsFilters } from '../model/types'

import { http } from '@/shared/api/http'
import { queryRoutes } from '@/shared/api/query-routes'
import { ResponseWithMsg } from '@/shared/lib/types'

export async function getStatistics(params: Partial<TStatisticsFilters>) {
  const { data } = await http<ResponseWithMsg<TStatistics>>(
    queryRoutes.statistics.getAll,
    {
      params,
    },
  )

  return data
}
