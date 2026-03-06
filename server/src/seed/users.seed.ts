import bcrypt from 'bcrypt'

import db from '../db/connection'
import { City } from '../modules/city/city.model'
import { Company } from '../modules/company/company.model'
import { Experience } from '../modules/experience/experience.model'
import { Location } from '../modules/location/location.model'
import { Position } from '../modules/position/position.model'
import { User } from '../modules/user/user.model'

export const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10)
  const cityRecords = await db.select().from(City)
  const experienceRecords = await db.select().from(Experience)
  const positionRecords = await db.select().from(Position)
  const companyRecords = await db.select().from(Company)
  const locationRecords = await db.select().from(Location)

  if (
    cityRecords.length < 2 ||
    experienceRecords.length < 2 ||
    positionRecords.length < 2 ||
    companyRecords.length < 2 ||
    locationRecords.length < 2
  ) {
    throw new Error('Not enough seed data in related tables')
  }

  await db.insert(User).values([
    {
      email: 'admin@admin.com',
      password: hashedPassword,
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
      password: hashedPassword,
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
      password: hashedPassword,
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[1].id,
      location: locationRecords[2].id,
      salary: '60000',
    },
    {
      email: 'user3@user.com',
      password: hashedPassword,
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[1].id,
      location: locationRecords[2].id,
      salary: '55000',
    },
    {
      email: 'user4@user.com',
      password: hashedPassword,
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[1].id,
      location: locationRecords[2].id,
      salary: '70000',
    },
    {
      email: 'user5@user.com',
      password: hashedPassword,
      role: 'user',
      city: cityRecords[2].id,
      experience: experienceRecords[2].id,
      position: positionRecords[2].id,
      company: companyRecords[1].id,
      location: locationRecords[2].id,
      salary: '65000',
    },
  ])

  console.log('User seeding completed.')
}
