import db from '../db/connection'
import { Company } from '../modules/company/company.model'

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
