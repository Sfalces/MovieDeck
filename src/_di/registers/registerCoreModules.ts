import { container } from '../container'
import { coreModules } from '../modules/coreModules'

export const registerCoreModules = () => container.register({ ...coreModules })
