import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useInject } from '_di/container'
import { Dashboard } from '..'
import { FavoritesProvider } from 'ui/_context/FavoritesContext'
import { favoritesStorage } from 'ui/_store/favoritesStorage'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    Link: ({ to, children }: any) => (
      <button data-testid={`link-${to}`} onClick={() => mockNavigate(to)}>
        {children}
      </button>
    ),
    useNavigate: () => mockNavigate,
  }
})

const trendingMovies = [
  { id: '1', title: 'Batman Begins', overview: '', vote: 8, releaseDate: '', poster: '' },
  { id: '2', title: 'The Flash', overview: '', vote: 7, releaseDate: '', poster: '' },
]

const upcomingMovies = [
  { id: '10', title: 'Blade Reboot', overview: '', vote: 0, releaseDate: '', poster: '' },
]

const movieByTitle = {
  id: '101',
  title: 'The Fellowship of the Ring',
  overview: '',
  vote: 9,
  releaseDate: '',
  poster: '',
}

describe('DashboardController', () => {
  let getTrendingMoviesMock: ReturnType<typeof vi.fn>
  let getComingSoonMock: ReturnType<typeof vi.fn>
  let getMovieByTitleMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
    favoritesStorage.clear()

    getTrendingMoviesMock = vi.fn().mockResolvedValue(trendingMovies)
    getComingSoonMock = vi.fn().mockResolvedValue(upcomingMovies)
    getMovieByTitleMock = vi.fn().mockResolvedValue(movieByTitle)
    ;(useInject as any).mockImplementation((key: string) => {
      switch (key) {
        case 'getTrendingMovies':
          return getTrendingMoviesMock
        case 'getComingSoon':
          return getComingSoonMock
        case 'getMovieByTitle':
          return getMovieByTitleMock
        default:
          throw new Error(`Unexpected dependency: ${key}`)
      }
    })
  })

  it('show movies', async () => {
    renderDashboard()

    await screen.findByText('Batman Begins')
    await screen.findByText('Blade Reboot')

    expect(screen.getByText('Batman Begins')).toBeInTheDocument()
    expect(screen.getByText('The Flash')).toBeInTheDocument()
    expect(screen.getByText('Blade Reboot')).toBeInTheDocument()

    expect(getTrendingMoviesMock).toHaveBeenCalledTimes(1)
    expect(getComingSoonMock).toHaveBeenCalledTimes(1)
    expect(getMovieByTitleMock).toHaveBeenCalledTimes(1)
  })

 

  it('triggers navigation when clicking a movie card', async () => {
    const user = userEvent.setup()

    renderDashboard()

    const movie = await screen.findByText(/batman/i)
    await user.click(movie)

    expect(mockNavigate).toHaveBeenCalledWith('/movieDetails/1')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('toggles favorite when clicking the favorite button', async () => {
    const user = userEvent.setup()
    renderDashboard()

    const movieTitle = await screen.findByText('Batman Begins')
    const linkButton = movieTitle.closest('button')
    expect(linkButton).not.toBeNull()

    const cardContainer = linkButton!.parentElement
    expect(cardContainer).not.toBeNull()

    const addButton = within(cardContainer!).getByRole('button', { name: 'Add to favorites' })
    expect(addButton).toHaveAttribute('aria-pressed', 'false')

    await user.click(addButton)

    const removeButton = within(cardContainer!).getByRole('button', { name: 'Remove from favorites' })
    expect(removeButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not navigate when clicking the favorite button', async () => {
    const user = userEvent.setup()
    renderDashboard()

    const movieTitle = await screen.findByText('Batman Begins')
    const linkButton = movieTitle.closest('button')
    expect(linkButton).not.toBeNull()

    const cardContainer = linkButton!.parentElement
    expect(cardContainer).not.toBeNull()

    mockNavigate.mockClear()

    const addButton = within(cardContainer!).getByRole('button', { name: 'Add to favorites' })
    await user.click(addButton)

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})

const renderDashboard = () =>
  render(
    <FavoritesProvider>
      <Dashboard />
    </FavoritesProvider>,
  )
