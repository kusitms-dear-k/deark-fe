export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  results: T
}
