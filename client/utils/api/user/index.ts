import { axiosInstance } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'
import { IUser, IUserCreateBody } from './types'

export async function getUsers() {
  const res = await axiosInstance.get(queryRoutes.user.getAll)
  return res.data
}

export async function getUser(id: string) {
  const res = await axiosInstance.get(queryRoutes.user.getOne(id))
  return res.data
}

export async function createUser(body: IUserCreateBody) {
  const res = await axiosInstance.post(queryRoutes.user.create, body)
  return res.data
}

export async function deleteUser(id: string) {
  const res = await axiosInstance.delete(queryRoutes.user.delete(id))
  return res.data
}

export async function updateUser(body: Partial<Omit<IUser, 'createdAt' | 'updatedAt'>>) {
  const { id, ...rest } = body
  const res = await axiosInstance.put(queryRoutes.user.update(id), { ...rest })
  return res.data
}
