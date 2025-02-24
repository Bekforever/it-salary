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

// Интерсептор запроса: добавляем токен в заголовок
http.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Интерсептор ответа: проверяем 403 и редиректим на вход
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error.toLowerCase().includes('токен')) {
      Cookies.remove(TOKEN) // Удаляем недействительный токен
      window.location.href = 'http://localhost:3000/sign_in'
    }
    return Promise.reject(error)
  },
)
