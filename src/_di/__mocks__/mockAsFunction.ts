import { mock, type MockProxy } from 'vitest-mock-extended'
import { asFunction } from '../resolvers'
import { container } from '../container'
import type { Container } from '../types'

export const mockAsFunction = <T extends keyof Container>(
  moduleName: T,
): MockProxy<Container[T]> => {
  const mockedFunction = mock<Container[T]>()
  container.register({
    [moduleName]: asFunction(() => mockedFunction),
  })

  return mockedFunction
}
