import * as cityRepo from './city.repository'

export async function getAll() {
  return cityRepo.findAllCities()
}

export async function getById(id: string) {
  const city = await cityRepo.findCityById(id)
  if (!city) throw { status: 404, message: 'Город не найден' }
  return city
}

export async function create(name: string) {
  if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
    throw { status: 400, message: 'Некорректное имя города' }
  }
  if (/[^a-zA-Zа-яА-ЯёЁ\s]/.test(name)) {
    throw { status: 400, message: 'Имя города содержит недопустимые символы' }
  }
  const existing = await cityRepo.findCityByName(name)
  if (existing) throw { status: 400, message: 'Такой город уже существует' }
  return cityRepo.createCity(name)
}

export async function update(id: string, name: string) {
  await getById(id)
  return cityRepo.updateCity(id, name)
}

export async function remove(id: string) {
  await getById(id)
  await cityRepo.deleteCity(id)
}
