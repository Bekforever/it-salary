import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { IErrorMsg } from '@/utils/lib/types'
import { IUser, IUserCreateBody } from './types'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '.'

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
  return useMutation<unknown, AxiosError<IErrorMsg>, IUserCreateBody>({
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
  return useMutation<IUser, unknown, Partial<Omit<IUser, 'createdAt' | 'updatedAt'>>>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
