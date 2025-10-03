import { City } from '../db/city.model'
import db from '../db/schema'

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
