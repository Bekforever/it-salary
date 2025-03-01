import { Experience } from '../db/experience.model'
import db from '../db/schema'

export const seedExperience = async () => {
  await db.insert(Experience).values([
    {
      name: '1 год - 2 года',
    },
    {
      name: '2 года - 3 года',
    },
    {
      name: '3 года - 5 лет',
    },
    {
      name: '5 лет - 10 лет',
    },
    {
      name: '10 лет - 15 лет',
    },
    {
      name: '15 лет и более',
    },
  ])
}
