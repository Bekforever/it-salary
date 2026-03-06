import db from '../db/connection'
import { City } from '../modules/city/city.model'

export const seedCity = async () => {
  await db.insert(City).values([
    {
      name: 'New-York',
    },
    {
      name: 'London',
    },
    {
      name: 'Moscow',
    },
    {
      name: 'Tashkent',
    },
    {
      name: 'Tokyo',
    },
  ])
}
