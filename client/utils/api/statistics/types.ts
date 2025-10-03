export interface TStatistics {
  users: Users
  salaries: {
    total: Salaries
    salaryByCity: Salaries & { city: string }
    salaryByPosition: Salaries & { position: string }
    salaryByExperience: Salaries & { experience: string }
    salaryByCompany: Salaries & { company: string }
    salaryByLocation: Salaries & { location: string }
  }
}

export interface Salaries {
  min: number
  max: number
  average: number
}

export interface Users {
  totalUsers: number
  usersByCity: UsersByCity[]
}

export interface UsersByCity {
  city: string
  count: string
}

export type TStatisticsFilters = {
  city: string
  experience: string
  position: string
}
