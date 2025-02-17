export interface IPositionCreateBody {
  name: string
}

export interface IPositionUpdateBody {
  id: string
  name: string
}

export interface IPosition {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
