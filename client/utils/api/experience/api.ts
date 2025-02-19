import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperiences,
  updateExperience,
} from '.'
import {
  IExperience,
  IExperienceCreateBody,
  IExperienceUpdateBody,
} from './types'
import { AxiosError } from 'axios'
import { TErrorMsg } from '@/utils/lib/types'

export const useGetAllExperiences = () => {
  return useQuery<any, AxiosError<TErrorMsg>, IExperience[]>({
    queryKey: ['experience'],
    queryFn: getExperiences,
  })
}

export const useGetOneExperience = (id: string) => {
  return useQuery<IExperience, AxiosError<TErrorMsg>, any>({
    queryKey: ['experience', id],
    queryFn: () => getExperience(id),
  })
}

export const useCreateExperience = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError<TErrorMsg>, IExperienceCreateBody>({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

export const useDeleteExperience = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError<TErrorMsg>, string>({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

export const useUpdateExperience = () => {
  const queryClient = useQueryClient()
  return useMutation<IExperience, AxiosError<TErrorMsg>, IExperienceUpdateBody>(
    {
      mutationFn: updateExperience,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['experience'] })
      },
    },
  )
}
