import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ILoginCredentials, ILoginResponseData } from './types'
import { login } from '../api/auth.api'

import { TOKEN } from '@/shared/config/constants'

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation<ILoginResponseData, any, ILoginCredentials>({
    mutationFn: login,
    onSuccess: (res) => {
      router.push('/')
      Cookies.set(TOKEN, res.data.token, { expires: 7 })
    },
    onError: (error) => {
      console.error(error)

      return error
    },
  })
}
