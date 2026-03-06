import bcrypt from 'bcrypt'

import { findCityById } from '../city/city.repository'
import * as userRepo from './user.repository'

export async function getAll() {
  return userRepo.findAllUsers()
}

export async function getById(id: string) {
  const user = await userRepo.findUserById(id)
  if (!user) throw { status: 404, message: 'Пользователь не найден' }
  return user
}

export async function create(body: {
  email: string
  password: string
  city: string
  role: string
  experience: string
  position: string
  salary: string
  company?: string
  location?: string
}) {
  const { email, password, city, ...rest } = body

  const existingCity = await findCityById(city)
  if (!existingCity) throw { status: 404, message: 'Город не найден' }

  const existingUser = await userRepo.findUserByEmail(email)
  if (existingUser) throw { status: 400, message: 'Пользователь с таким email уже существует' }

  const hashedPassword = await bcrypt.hash(password, 10)
  return userRepo.createUser({ email, password: hashedPassword, city, ...rest })
}

export async function update(id: string, body: Record<string, any>) {
  const { password, city, ...rest } = body

  await getById(id)

  if (city) {
    const existingCity = await findCityById(city)
    if (!existingCity) throw { status: 404, message: 'Город не найден' }
  }

  let data: Record<string, any> = { ...rest }
  if (city) data.city = city
  if (password) data.password = await bcrypt.hash(password, 10)

  return userRepo.updateUser(id, data)
}

export async function remove(id: string) {
  await getById(id)
  await userRepo.deleteUser(id)
}
