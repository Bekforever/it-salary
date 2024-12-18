import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperiences,
  updateExperience,
} from '.'
import { IExperience, IExperienceCreateBody, IExperienceUpdateBody } from './types'
import { AxiosError } from 'axios'
import { IErrorMsg } from '@/utils/lib/types'

export const useGetAllExperiences = () => {
  return useQuery<any, AxiosError<IErrorMsg>, IExperience[]>({
    queryKey: ['experience'],
    queryFn: getExperiences,
  })
}

export const useGetOneExperience = (id: string) => {
  return useQuery<IExperience, AxiosError<IErrorMsg>, any>({
    queryKey: ['experience', id],
    queryFn: () => getExperience(id),
  })
}

export const useCreateExperience = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError<IErrorMsg>, IExperienceCreateBody>({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

export const useDeleteExperience = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError<IErrorMsg>, string>({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}

export const useUpdateExperience = () => {
  const queryClient = useQueryClient()
  return useMutation<IExperience, AxiosError<IErrorMsg>, IExperienceUpdateBody>({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] })
    },
  })
}
