export interface ICityCreateBody {
  name: string
}

export interface ICityUpdateBody {
  id: string
  name: string
}

export interface ICity {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
