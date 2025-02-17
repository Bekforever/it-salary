import { login } from '.'
import { ILoginCredentials, ILoginResponseData } from './types'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { TOKEN } from '@/utils/config/constants'
import { useRouter } from 'next/navigation'


export const useLoginMutation = () => {
  const router = useRouter()
  return useMutation<ILoginResponseData, any, ILoginCredentials>({
    mutationFn: login,
    onSuccess: (res) => {
      router.push('/')
      Cookies.set(TOKEN, res.data.token, { expires: 7 })
    },
    onError: (error) => {
      console.log(error)
    },
  })
}
