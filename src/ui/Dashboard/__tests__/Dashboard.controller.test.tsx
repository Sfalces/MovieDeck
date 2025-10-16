import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Dashboard } from '..'

describe('DasboardController', () => {
  beforeEach(() => {
    localStorage.clear()
    cleanup()
  })

  it('should render MovieDeck', () => {
    render(<Dashboard />)

    expect(screen.getByText('MovieDeck')).toBeInTheDocument()
  })
})
