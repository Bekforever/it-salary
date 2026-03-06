export interface ILoginCredentials {
  email: string
  password: string
}

export interface ILoginResponseData {
  message: string
  data: ILoginResponse
}

export interface ILoginResponse {
  token: string
  user: AuthUser
}

export interface AuthUser {
  id: string
  email: string
  role: string
  city: string
  experience: string
  position: string
  salary: string
  createdAt: Date
  updatedAt: Date
}
