import { eq } from 'drizzle-orm'
import { City } from '../db/city.model'
import { Experience } from '../db/experience.model'
import { Position } from '../db/position.model'
import { Company } from '../db/company.model'
import { Location } from '../db/location.model'
import { User } from '../db/user.model'
import db from '../db/schema'

export const seedUsers = async () => {
  const cityRecords = await db.select().from(City)
  const experienceRecords = await db.select().from(Experience)
  const positionRecords = await db.select().from(Position)
  const companyRecords = await db.select().from(Company)
  const locationRecords = await db.select().from(Location)

  if (
    cityRecords.length < 3 ||
    experienceRecords.length < 3 ||
    positionRecords.length < 3 ||
    companyRecords.length < 3 ||
    locationRecords.length < 3
  ) {
    throw new Error('Not enough seed data in related tables')
  }

  await db.insert(User).values([
    {
      email: 'admin@admin.com',
      password: 'password123',
      role: 'boss',
      city: cityRecords[0].id,
      experience: experienceRecords[0].id,
      position: positionRecords[0].id,
      company: companyRecords[0].id,
      location: locationRecords[0].id,
      salary: '80000',
    },
    {
      email: 'user1@user.com',
      password: 'password123',
      role: 'user',
      city: cityRecords[1].id,
      experience: experienceRecords[1].id,
      position: positionRecords[1].id,
      company: companyRecords[1].id,
      location: locationRecords[1].id,
      salary: '50000',
    },
    {
      email: 'user2@user.com',
      password: 'password123',
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[2].id,
      location: locationRecords[2].id,
      salary: '60000',
    },
    {
      email: 'user3@user.com',
      password: 'password123',
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[2].id,
      location: locationRecords[2].id,
      salary: '55000',
    },
    {
      email: 'user4@user.com',
      password: 'password123',
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[2].id,
      location: locationRecords[2].id,
      salary: '70000',
    },
    {
      email: 'user5@user.com',
      password: 'password123',
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[2].id,
      location: locationRecords[2].id,
      salary: '65000',
    },
  ])

  console.log('User seeding completed.')
}
