import { axiosInstance } from '@/utils/config/axios'
import { ILoginCredentials, ILoginResponseData } from './types'
import { baseURL, TOKEN } from '@/utils/config/constants'
import { queryRoutes } from '@/utils/config/query-routes'

export async function login(credentials: ILoginCredentials) {
  try {
    const res = await axiosInstance.post<ILoginResponseData>(queryRoutes.auth.login, credentials)
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Произошла ошибка при входе. Попробуйте еще раз')
  }
}

export async function checkUser(token?: string) {
  try {
    const res = await fetch(`${baseURL}${queryRoutes.auth.getMe}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`Произошла ошибка при проверке пользователя: ${error}`)
  }
}
