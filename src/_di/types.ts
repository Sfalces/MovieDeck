import type { coreModules } from './modules/coreModules'

type Module = typeof coreModules

export type Container = {
  [P in keyof Module]: ReturnType<Module[P]['resolve']>
}
