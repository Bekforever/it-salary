import { Location } from '../db/location.model'
import db from '../db/schema'

export const seedLocation = async () => {
  await db.insert(Location).values([
    {
      name: 'Remote',
    },
    {
      name: 'Office',
    },
    {
      name: 'Hybrid',
    },
  ])
}
