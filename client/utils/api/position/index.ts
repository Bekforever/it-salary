import { queryRoutes } from '@/utils/config/query-routes'
import { IPositionCreateBody, IPositionUpdateBody } from './types'
import { http } from '@/utils/config/axios'

export async function getPositions() {
  const res = await http.get(queryRoutes.position.getAll)
  return res.data
}

export async function getPosition(id: string) {
  const res = await http.get(queryRoutes.position.getOne(id))
  return res.data
}

export async function createPosition(body: IPositionCreateBody) {
  const res = await http.post(queryRoutes.position.create, body)
  return res.data
}

export async function deletePosition(id: string) {
  const res = await http.delete(queryRoutes.position.delete(id))
  return res.data
}

export async function updatePosition({ id, name }: IPositionUpdateBody) {
  const res = await http.put(queryRoutes.position.update(id), { name })
  return res.data
}
