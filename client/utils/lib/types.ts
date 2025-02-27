export type TErrorMsg = {
  message: string
}

export type ResponseWithMsg<T> = {
  data: T
  message: string
}

export type IdName = {
  id: number
  name: string
}
