export interface TStatistics {
  users: Users
  salaries: Salaries
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
