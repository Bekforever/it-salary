import * as positionRepo from './position.repository'

export async function getAll() {
  return positionRepo.findAllPositions()
}

export async function getById(id: string) {
  const position = await positionRepo.findPositionById(id)
  if (!position) throw { status: 404, message: 'Позиция не найдена' }
  return position
}

export async function create(name: string) {
  if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
    throw { status: 400, message: 'Некорректное имя позиции' }
  }
  const existing = await positionRepo.findPositionByName(name)
  if (existing) throw { status: 400, message: 'Позиция с таким именем уже существует' }
  return positionRepo.createPosition(name)
}

export async function update(id: string, name: string) {
  await getById(id)
  return positionRepo.updatePosition(id, name)
}

export async function remove(id: string) {
  await getById(id)
  await positionRepo.deletePosition(id)
}
