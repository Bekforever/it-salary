import * as companyRepo from './company.repository'

export async function getAll() {
  return companyRepo.findAllCompanies()
}

export async function getById(id: string) {
  const company = await companyRepo.findCompanyById(id)
  if (!company) throw { status: 404, message: 'Компания не найдена' }
  return company
}

export async function create(name: string) {
  if (!name) throw { status: 400, message: 'Поле name обязательно' }
  const existing = await companyRepo.findCompanyByName(name)
  if (existing) throw { status: 400, message: 'Компания с таким именем уже существует' }
  return companyRepo.createCompany(name)
}

export async function update(id: string, name: string) {
  await getById(id)
  return companyRepo.updateCompany(id, name)
}

export async function remove(id: string) {
  await getById(id)
  await companyRepo.deleteCompany(id)
}
