import { http } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'
import { ICityCreateBody, ICityUpdateBody } from './types'

export async function getCities() {
  const res = await http.get(queryRoutes.city.getAll)
  return res.data
}

export async function getCity(id: string) {
  const res = await http.get(queryRoutes.city.getOne(id))
  return res.data
}

export async function createCity(body: ICityCreateBody) {
  const res = await http.post(queryRoutes.city.create, body)
  return res.data
}

export async function deleteCity(id: string) {
  const res = await http.delete(queryRoutes.city.delete(id))
  return res.data
}

export async function updateCity({ id, name }: ICityUpdateBody) {
  const res = await http.put(queryRoutes.city.update(id), { name })
  return res.data
}
