import { axiosInstance } from '@/utils/config/axios'
import { queryRoutes } from '@/utils/config/query-routes'

export async function getExperiences() {
  const res = await axiosInstance.get(queryRoutes.experience.getAll)
  return res.data
}

export async function getExperience(id: string) {
  const res = await axiosInstance.get(queryRoutes.experience.getOne(id))
  return res.data
}

export async function createExperience(body: any) {
  const res = await axiosInstance.post(queryRoutes.experience.create, body)
  return res.data
}

export async function deleteExperience(id: string) {
  const res = await axiosInstance.delete(queryRoutes.experience.delete(id))
  return res.data
}

export async function updateExperience({ id, name }: any) {
  const res = await axiosInstance.put(queryRoutes.experience.update(id), { name })
  return res.data
}
