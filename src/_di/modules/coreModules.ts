import { moviesModules } from '../../core/Movies/_di'
import { sharedModules } from '../../core/Shared/_di'

export const coreModules = {
  ...moviesModules,
  ...sharedModules,
}
