/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('_di/container', () => ({
  useInject: vi.fn(),
}))
