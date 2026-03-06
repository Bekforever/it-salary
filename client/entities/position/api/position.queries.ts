import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { IPosition, IPositionCreateBody, IPositionUpdateBody } from '../model/types'
import {
  createPosition,
  deletePosition,
  getPositions,
  getPosition,
  updatePosition,
} from './position.api'

import { TErrorMsg } from '@/shared/lib/types'

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

  return useMutation<unknown, AxiosError<TErrorMsg>, IPositionCreateBody>({
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
