import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { SearchDropdownController } from '../SearchDropdown.controller'
import { useDebounce } from 'ui/_hooks/useDebounce'
import { useInject } from '_di/container'

vi.mock('ui/_hooks/useDebounce', () => ({
  useDebounce: vi.fn()
}))

vi.mock('_di/container', () => ({
  useInject: vi.fn()
}))

const mockSearchDropdownProps = vi.fn()

vi.mock('../SearchDropdown', () => ({
  SearchDropdown: (props: unknown) => {
    mockSearchDropdownProps(props)
    return <div data-testid="mock-search-dropdown" />
  }
}))

const getLastDropdownProps = () => {
  const calls = mockSearchDropdownProps.mock.calls
  if (calls.length === 0) {
    return undefined
  }

  return calls[calls.length - 1][0]
}

const mockedUseDebounce = vi.mocked(useDebounce)
const mockedUseInject = vi.mocked(useInject)

describe('SearchDropdownController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedUseDebounce.mockImplementation((value) => value)
  })

  it('does not render when the query is shorter than two characters', () => {
    const searchMoviesMock = vi.fn().mockResolvedValue([])
    mockedUseInject.mockReturnValue(searchMoviesMock)

    const { container } = render(
      <SearchDropdownController
        searchQuery="a"
        onSelectMovie={vi.fn()}
        onClose={vi.fn()}
      />
    )

    expect(container.firstChild).toBeNull()
    expect(searchMoviesMock).not.toHaveBeenCalled()
    expect(mockSearchDropdownProps).not.toHaveBeenCalled()
  })

  it('fetches movies and exposes up to five results', async () => {
    const movies = Array.from({ length: 8 }, (_, index) => ({
      id: `${index}`,
      title: `Movie ${index}`,
      overview: '',
      vote: index,
      releaseDate: '',
      poster: ''
    }))
    const searchMoviesMock = vi.fn().mockResolvedValue(movies)
    mockedUseInject.mockReturnValue(searchMoviesMock)
    const onClose = vi.fn()

    render(
      <SearchDropdownController
        searchQuery="  spider   "
        onSelectMovie={vi.fn()}
        onClose={onClose}
      />
    )

    await waitFor(() => {
      expect(searchMoviesMock).toHaveBeenCalledWith('spider', expect.any(AbortSignal))
    })

    await waitFor(() => {
      const lastProps = getLastDropdownProps()
      expect(lastProps).toBeDefined()
      expect(lastProps?.results).toHaveLength(5)
      expect(lastProps?.results).toEqual(movies.slice(0, 5))
      expect(lastProps?.error).toBeNull()
      expect(lastProps?.isLoading).toBe(false)
      expect(lastProps?.onClose).toBe(onClose)
    })
  })

  it('propagates an error when the search fails', async () => {
    const searchMoviesMock = vi.fn().mockRejectedValue(new Error('network down'))
    mockedUseInject.mockReturnValue(searchMoviesMock)

    render(
      <SearchDropdownController
        searchQuery="matrix"
        onSelectMovie={vi.fn()}
        onClose={vi.fn()}
      />
    )

    await waitFor(() => {
      expect(searchMoviesMock).toHaveBeenCalled()
    })

    await waitFor(() => {
      const lastProps = getLastDropdownProps()
      expect(lastProps).toBeDefined()
      expect(lastProps?.error).toBe('Failed to search movies')
      expect(lastProps?.results).toEqual([])
    })
  })
})
