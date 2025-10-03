import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { IUser, IUserCreateBody } from './types'

import { createUser, deleteUser, getUser, getUsers, updateUser } from '.'

import { TErrorMsg } from '@/utils/lib/types'

export const useGetAllUsers = () => {
  return useQuery<IUser[], any, IUser[]>({
    queryKey: ['user'],
    queryFn: getUsers,
  })
}

export const useGetOneUser = (id: string) => {
  return useQuery<IUser, any, any>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, AxiosError<TErrorMsg>, IUserCreateBody>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, any, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<
    IUser,
    unknown,
    Partial<Omit<IUser, 'createdAt' | 'updatedAt'>>
  >({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
