import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createPosition, deletePosition, getPositions, getPosition, updatePosition } from '.'
import { IPosition, IPositionCreateBody, IPositionUpdateBody } from './types'
import { AxiosError } from 'axios'
import { IErrorMsg } from '@/utils/lib/types'

export const useGetAllPositions = () => {
  return useQuery<IPosition[], any, IPosition[]>({
    queryKey: ['position'],
    queryFn: getPositions,
  })
}

export const useGetOnePosition = (id: string) => {
  return useQuery<IPosition, any, any>({
    queryKey: ['position', id],
    queryFn: () => getPosition(id),
  })
}

export const useCreatePosition = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError<IErrorMsg>, IPositionCreateBody>({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['position'] })
    },
  })
}

export const useDeletePosition = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, any, string>({
    mutationFn: deletePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['position'] })
    },
  })
}

export const useUpdatePosition = () => {
  const queryClient = useQueryClient()
  return useMutation<IPosition, unknown, IPositionUpdateBody>({
    mutationFn: updatePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['position'] })
    },
  })
}
