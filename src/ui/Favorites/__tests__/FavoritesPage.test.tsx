import { render, screen, fireEvent } from '@testing-library/react'
import { FavoritesPage } from '../FavoritesPage'
import { vi, Mock } from 'vitest'
import { MemoryRouter } from 'react-router'
import { useFavorites } from 'ui/_hooks/useFavorites'
import type { Movie } from 'core/Movies/domain/Movie'

// Mock useFavorites hook
vi.mock('ui/_hooks/useFavorites')

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

describe('FavoritesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render empty state when no favorites', () => {
    (useFavorites as Mock).mockReturnValue({
      favorites: [],
      count: 0,
    })

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    )

    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
    expect(screen.getByText('Browse movies')).toBeInTheDocument()
  })

  it('should render list of favorites', () => {
    const movies = [
      aMovie({ id: '1', title: 'Movie 1' }),
      aMovie({ id: '2', title: 'Movie 2' }),
    ]

    ;(useFavorites as Mock).mockReturnValue({
      favorites: movies,
      count: 2,
      isFavorite: () => true,
    })

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByText('2 movies')).toBeInTheDocument()
    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 2')).toBeInTheDocument()
  })

  it('should sort favorites by rating', () => {
    const movies = [
      aMovie({ id: '1', title: 'Low Rating', vote: 5 }),
      aMovie({ id: '2', title: 'High Rating', vote: 9 }),
    ]

    ;(useFavorites as Mock).mockReturnValue({
      favorites: movies,
      count: 2,
      isFavorite: () => true,
    })

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    )

    const select = screen.getByLabelText('Sort by:')
    fireEvent.change(select, { target: { value: 'rating' } })

    const movieElements = screen.getAllByRole('heading', { level: 2 }).filter(h => h.textContent !== 'Favorites')
    expect(movieElements[0]).toHaveTextContent('High Rating')
    expect(movieElements[1]).toHaveTextContent('Low Rating')
  })

  it('should sort favorites by year', () => {
    const movies = [
      aMovie({ id: '1', title: 'Old Movie', releaseDate: '2000-01-01' }),
      aMovie({ id: '2', title: 'New Movie', releaseDate: '2023-01-01' }),
    ]

    ;(useFavorites as Mock).mockReturnValue({
      favorites: movies,
      count: 2,
      isFavorite: () => true,
    })

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    )

    const select = screen.getByLabelText('Sort by:')
    fireEvent.change(select, { target: { value: 'year' } })

    const movieElements = screen.getAllByRole('heading', { level: 2 }).filter(h => h.textContent !== 'Favorites')
    expect(movieElements[0]).toHaveTextContent('New Movie')
    expect(movieElements[1]).toHaveTextContent('Old Movie')
  })
})
