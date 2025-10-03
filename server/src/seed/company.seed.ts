import { Company } from '../db/company.model'
import db from '../db/schema'

export const seedCompany = async () => {
  await db.insert(Company).values([
    {
      name: 'Зарубежные',
    },
    {
      name: 'Узбекистанские',
    },
  ])
}
