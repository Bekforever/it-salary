import axios from 'axios'
import Cookies from 'js-cookie'
import { baseURL, TOKEN } from './constants'

export const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN)
  config.headers['Authorization'] = token ? `Bearer ${token}` : ''
  config.headers['Content-Type'] = 'application/json'
  return config
})
