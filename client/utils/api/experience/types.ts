export interface IExperienceCreateBody {
  name: string
}

export interface IExperienceUpdateBody {
  id: string
  name: string
}

export interface IExperience {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
