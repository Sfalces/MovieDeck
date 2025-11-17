import { asFunction } from '../../../_di/resolvers'
import { apiClient } from '../infrastructure/apiClient'
import { apiClientInstance } from '../infrastructure/apiClientInstance'

export const sharedModules = {
  apiClient: asFunction(apiClient),
  apiClientInstance: asFunction(apiClientInstance),
}
