import * as experienceRepo from './experience.repository'

export async function getAll() {
  return experienceRepo.findAllExperiences()
}

export async function getById(id: string) {
  const experience = await experienceRepo.findExperienceById(id)
  if (!experience) throw { status: 404, message: 'Опыт не найден' }
  return experience
}

export async function create(name: string) {
  if (!name) throw { status: 400, message: 'Поле name обязательно' }
  return experienceRepo.createExperience(name)
}

export async function update(id: string, name: string) {
  await getById(id)
  return experienceRepo.updateExperience(id, name)
}

export async function remove(id: string) {
  await getById(id)
  await experienceRepo.deleteExperience(id)
}
