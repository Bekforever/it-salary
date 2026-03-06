import { IUser, IUserCreateBody } from '../model/types'

import { http } from '@/shared/api/http'
import { queryRoutes } from '@/shared/api/query-routes'

export async function getUsers() {
  const res = await http.get(queryRoutes.user.getAll)

  return res.data
}

export async function getUser(id: string) {
  const res = await http.get(queryRoutes.user.getOne(id))

  return res.data
}

export async function createUser(body: IUserCreateBody) {
  const res = await http.post(queryRoutes.user.create, body)

  return res.data
}

export async function deleteUser(id: string) {
  const res = await http.delete(queryRoutes.user.delete(id))

  return res.data
}

export async function updateUser(
  body: Partial<Omit<IUser, 'createdAt' | 'updatedAt'>>,
) {
  const { id, ...rest } = body
  const res = await http.put(queryRoutes.user.update(id), { ...rest })

  return res.data
}
