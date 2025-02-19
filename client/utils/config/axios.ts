'use client'
import axios from 'axios'
import Cookies from 'js-cookie'
import { baseURL, TOKEN } from './constants'

export const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN)
  config.headers['Authorization'] = token ? `Bearer ${token}` : ''
  config.headers['Content-Type'] = 'application/json'
  return config
})
