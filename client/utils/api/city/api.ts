import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCity, deleteCity, getCities, getCity, updateCity } from '.'
import { ICity, ICityCreateBody, ICityUpdateBody } from './types'
import { AxiosError } from 'axios'
import { IErrorMsg } from '@/utils/lib/types'

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
  return useMutation<unknown, AxiosError<IErrorMsg>, ICityCreateBody>({
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
