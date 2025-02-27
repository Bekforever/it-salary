import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getStatistics } from '.'
import { ResponseWithMsg } from '@/utils/lib/types'
import { TStatistics, TStatisticsFilters } from './types'

export const useGetStatistics = (params: TStatisticsFilters) => {
  const purifyParams = () => {
    const { city, experience, position } = params
    const newParams: Partial<TStatisticsFilters> = {}
    if (city) newParams.city = city
    if (experience) newParams.experience = experience
    if (position) newParams.position = position
    console.log('newParams', newParams)
    console.log('params', params)
    return newParams
  }
  return useQuery<ResponseWithMsg<TStatistics>>({
    queryKey: ['statistics', purifyParams()],
    queryFn: () => getStatistics(purifyParams()),
    placeholderData: keepPreviousData,
  })
}
