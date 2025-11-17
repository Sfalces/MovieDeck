import { mock, type MockProxy } from 'vitest-mock-extended'
import { asValue } from '../resolvers'
import { container } from '../container'
import type { Container } from 'react-dom/client'

export const mockAsValue = <T extends keyof Container>(moduleName: T): MockProxy<Container[T]> => {
  const mockedValue = mock<Container[T]>()

  container.register({
    [moduleName]: asValue(mockedValue),
  })

  return mockedValue
}
