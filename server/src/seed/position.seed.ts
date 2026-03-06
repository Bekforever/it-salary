import db from '../db/connection'
import { Position } from '../modules/position/position.model'

export const seedPosition = async () => {
  await db.insert(Position).values([
    {
      name: 'Junior',
    },
    {
      name: 'Middle',
    },
    {
      name: 'Senior',
    },
    {
      name: 'Lead',
    },
    {
      name: 'Architect',
    },
  ])
}
