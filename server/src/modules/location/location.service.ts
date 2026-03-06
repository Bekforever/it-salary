import * as locationRepo from './location.repository'

export async function getAll() {
  return locationRepo.findAllLocations()
}

export async function getById(id: string) {
  const location = await locationRepo.findLocationById(id)
  if (!location) throw { status: 404, message: 'Локация не найдена' }
  return location
}

export async function create(name: string) {
  if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
    throw { status: 400, message: 'Некорректное имя локации' }
  }
  const existing = await locationRepo.findLocationByName(name)
  if (existing) throw { status: 400, message: 'Локация с таким именем уже существует' }
  return locationRepo.createLocation(name)
}

export async function update(id: string, name: string) {
  if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
    throw { status: 400, message: 'Некорректное имя локации' }
  }
  await getById(id)
  return locationRepo.updateLocation(id, name)
}

export async function remove(id: string) {
  await getById(id)
  await locationRepo.deleteLocation(id)
}
