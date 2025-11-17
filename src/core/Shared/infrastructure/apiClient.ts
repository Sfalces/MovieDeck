import type { AxiosInstance } from 'axios'
import type { ApiClient } from '../domain/ApiClient'

interface Dependencies {
  apiClientInstance: AxiosInstance
}

export const apiClient = ({ apiClientInstance }: Dependencies): ApiClient => ({
  get: async (endpoint, config) => {
    return apiClientInstance.get(endpoint, config)
  },
})
