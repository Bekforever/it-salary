import { axiosInstance } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'
import { ICityCreateBody, ICityUpdateBody } from './types'

export async function getCities() {
  const res = await axiosInstance.get(queryRoutes.city.getAll)
  return res.data
}

export async function getCity(id: string) {
  const res = await axiosInstance.get(queryRoutes.city.getOne(id))
  return res.data
}

export async function createCity(body: ICityCreateBody) {
  const res = await axiosInstance.post(queryRoutes.city.create, body)
  return res.data
}

export async function deleteCity(id: string) {
  const res = await axiosInstance.delete(queryRoutes.city.delete(id))
  return res.data
}

export async function updateCity({ id, name }: ICityUpdateBody) {
  const res = await axiosInstance.put(queryRoutes.city.update(id), { name })
  return res.data
}
