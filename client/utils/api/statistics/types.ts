

export interface TStatistics {
  totalUsers: number
  min: number
  max: number
  average: number
}

export interface AvgSalaryByCity {
  city:          string;
  averageSalary: string;
  cities:        Cities;
}

export interface Cities {
  name: string;
  id:   string;
}

export interface AvgSalaryByExperience {
  experience:    string;
  averageSalary: string;
  experiences:   Cities;
}

export interface AvgSalaryByPosition {
  averageSalary: string;
  positions:     Cities;
}

export interface UsersByCity {
  city:   string;
  count:  string;
  cities: Cities;
}

export interface UsersByExperience {
  experience:  string;
  count:       string;
  experiences: Cities;
}

export interface UsersByPosition {
  position:  string;
  count:     string;
  positions: Cities;
}


export type TStatisticsFilters = {
  city: string
  experience: string
  position: string
}
