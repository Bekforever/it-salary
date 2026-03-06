import { eq } from 'drizzle-orm'

import db from '../../db/connection'
import { Company } from './company.model'

export async function findAllCompanies() {
  return db.select().from(Company)
}

export async function findCompanyById(id: string) {
  const result = await db.select().from(Company).where(eq(Company.id, id))
  return result[0] ?? null
}

export async function findCompanyByName(name: string) {
  const result = await db.select().from(Company).where(eq(Company.name, name))
  return result[0] ?? null
}

export async function createCompany(name: string) {
  const [result] = await db.insert(Company).values({ name }).returning()
  return result
}

export async function updateCompany(id: string, name: string) {
  const [result] = await db.update(Company).set({ name }).where(eq(Company.id, id)).returning()
  return result
}

export async function deleteCompany(id: string) {
  await db.delete(Company).where(eq(Company.id, id))
}
