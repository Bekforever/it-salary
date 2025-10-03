import { Position } from '../db/position.model'
import db from '../db/schema'

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
