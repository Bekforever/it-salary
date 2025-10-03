import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { ILoginCredentials, ILoginResponseData } from './types'

import { login } from '.'

import { TOKEN } from '@/utils/config/constants'

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
