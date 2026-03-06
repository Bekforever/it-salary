import { ILoginCredentials, ILoginResponseData } from '../model/types'

import { http } from '@/shared/api/http'
import { baseURL } from '@/shared/config/constants'
import { queryRoutes } from '@/shared/api/query-routes'

export async function login(credentials: ILoginCredentials) {
  try {
    const res = await http.post<ILoginResponseData>(
      queryRoutes.auth.login,
      credentials,
    )

    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Произошла ошибка при входе. Попробуйте еще раз')
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
