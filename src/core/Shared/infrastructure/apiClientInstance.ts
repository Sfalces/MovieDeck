import axios, { type AxiosInstance } from 'axios'

export const apiClientInstance = (): AxiosInstance => {
  const instance = axios.create({ baseURL: 'https://api.themoviedb.org/3' })
  return instance
}
