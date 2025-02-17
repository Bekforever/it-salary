import { axiosInstance } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'
import { IPositionCreateBody, IPositionUpdateBody } from './types'

export async function getPositions() {
  const res = await axiosInstance.get(queryRoutes.position.getAll)
  return res.data
}

export async function getPosition(id: string) {
  const res = await axiosInstance.get(queryRoutes.position.getOne(id))
  return res.data
}

export async function createPosition(body: IPositionCreateBody) {
  const res = await axiosInstance.post(queryRoutes.position.create, body)
  return res.data
}

export async function deletePosition(id: string) {
  const res = await axiosInstance.delete(queryRoutes.position.delete(id))
  return res.data
}

export async function updatePosition({ id, name }: IPositionUpdateBody) {
  const res = await axiosInstance.put(queryRoutes.position.update(id), { name })
  return res.data
}
