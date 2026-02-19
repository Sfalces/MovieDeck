import { act, renderHook } from '@testing-library/react'
import { FavoritesProvider } from '../FavoritesContext'
import { useFavorites } from 'ui/_hooks/useFavorites'
import { favoritesStorage } from 'ui/_store/favoritesStorage'
import { vi } from 'vitest'
import type { Movie } from 'core/Movies/domain/Movie'

// Mock favoritesStorage
vi.mock('ui/_store/favoritesStorage', () => ({
  favoritesStorage: {
    load: vi.fn(),
    save: vi.fn(),
    clear: vi.fn(),
  },
}))

const aMovie = (overrides?: Partial<Movie>): Movie => ({
  id: '1',
  title: 'Test Movie',
  overview: 'Test Overview',
  vote: 8.5,
  releaseDate: '2023-01-01',
  popularity: 100,
  poster: 'test.jpg',
  ...overrides,
})

describe('FavoritesContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(favoritesStorage.load).mockReturnValue({})
  })

  it('should provide initial empty state', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: FavoritesProvider })
    
    expect(result.current.favorites).toEqual([])
    expect(result.current.count).toBe(0)
  })

  it('should load initial state from storage', () => {
    const movie = aMovie()
    vi.mocked(favoritesStorage.load).mockReturnValue({ [movie.id]: movie })

    const { result } = renderHook(() => useFavorites(), { wrapper: FavoritesProvider })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0]).toEqual(movie)
    expect(result.current.isFavorite(movie.id)).toBe(true)
  })

  it('should toggle favorite (add)', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: FavoritesProvider })
    const movie = aMovie()

    act(() => {
      result.current.toggleFavorite(movie)
    })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.isFavorite(movie.id)).toBe(true)
    expect(favoritesStorage.save).toHaveBeenCalledWith({ [movie.id]: movie })
  })

  it('should toggle favorite (remove)', () => {
    const movie = aMovie()
    vi.mocked(favoritesStorage.load).mockReturnValue({ [movie.id]: movie })
    
    const { result } = renderHook(() => useFavorites(), { wrapper: FavoritesProvider })

    act(() => {
      result.current.toggleFavorite(movie)
    })

    expect(result.current.favorites).toHaveLength(0)
    expect(result.current.isFavorite(movie.id)).toBe(false)
    expect(favoritesStorage.save).toHaveBeenCalledWith({})
  })

  it('should remove favorite by id', () => {
    const movie = aMovie()
    vi.mocked(favoritesStorage.load).mockReturnValue({ [movie.id]: movie })
    
    const { result } = renderHook(() => useFavorites(), { wrapper: FavoritesProvider })

    act(() => {
      result.current.removeFavorite(movie.id)
    })

    expect(result.current.favorites).toHaveLength(0)
    expect(favoritesStorage.save).toHaveBeenCalledWith({})
  })
})
