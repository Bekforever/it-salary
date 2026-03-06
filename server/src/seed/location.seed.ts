import db from '../db/connection'
import { Location } from '../modules/location/location.model'

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
