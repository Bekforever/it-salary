import { seedCity } from './city.seed'
import { seedCompany } from './company.seed'
import { seedExperience } from './experience.seed'
import { seedLocation } from './location.seed'
import { seedPosition } from './position.seed'
import { seedUsers } from './users.seed'

export const seed = async () => {
  await seedCity()
  await seedCompany()
  await seedExperience()
  await seedLocation()
  await seedPosition()
  await seedUsers()
}

seed()
