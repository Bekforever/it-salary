import { http } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'
import { TStatistics } from './types'
import { ResponseWithMsg } from '@/utils/lib/types'

export async function getStatistics() {
  const { data } = await http<ResponseWithMsg<TStatistics>>(
    queryRoutes.statistics.getAll,
  )
  return data.data
}
