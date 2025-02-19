import { useQuery } from '@tanstack/react-query'
import { getStatistics } from '.'
import { ResponseWithMsg, TErrorMsg } from '@/utils/lib/types'
import { TStatistics } from './types'

export const useGetStatistics = () => {
  return useQuery<TStatistics>({
    queryKey: ['statistics'],
    queryFn: getStatistics,
  })
}
