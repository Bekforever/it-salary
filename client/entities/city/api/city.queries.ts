import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ICity, ICityCreateBody, ICityUpdateBody } from '../model/types'
import { createCity, deleteCity, getCities, getCity, updateCity } from './city.api'

import { TErrorMsg } from '@/shared/lib/types'

export const useGetAllCities = () => {
  return useQuery<ICity[], any, ICity[]>({
    queryKey: ['city'],
    queryFn: getCities,
  })
}

export const useGetOneCity = (id: string) => {
  return useQuery<ICity, any, any>({
    queryKey: ['city', id],
    queryFn: () => getCity(id),
  })
}

export const useCreateCity = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, AxiosError<TErrorMsg>, ICityCreateBody>({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['city'] })
    },
  })
}

export const useDeleteCity = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, any, string>({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['city'] })
    },
  })
}

export const useUpdateCity = () => {
  const queryClient = useQueryClient()

  return useMutation<ICity, unknown, ICityUpdateBody>({
    mutationFn: updateCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['city'] })
    },
  })
}
