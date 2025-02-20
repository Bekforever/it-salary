import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getStatistics } from '.'
import { ResponseWithMsg } from '@/utils/lib/types'
import { TStatistics, TStatisticsFilters } from './types'

export const useGetStatistics = (params: TStatisticsFilters) => {
  return useQuery<ResponseWithMsg<TStatistics>>({
    queryKey: ['statistics', params],
    queryFn: () => getStatistics(params),
    placeholderData: keepPreviousData,
  })
}
