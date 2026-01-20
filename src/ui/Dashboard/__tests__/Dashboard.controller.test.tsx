import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useInject } from '_di/container'
import { Dashboard } from '..'

vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    Link: ({ to, children }: any) => (
      <button data-testid={`link-${to}`} onClick={() => mockNavigate(to)}>
        {children}
      </button>
    ),
  }
})

const mockNavigate = vi.fn()

const trendingMovies = [
  { id: '1', title: 'Batman Begins', overview: '', vote: 8, releaseDate: '', poster: '' },
  { id: '2', title: 'The Flash', overview: '', vote: 7, releaseDate: '', poster: '' },
]

const upcomingMovies = [
  { id: '10', title: 'Blade Reboot', overview: '', vote: 0, releaseDate: '', poster: '' },
]

const movieByTitle = [
  { id: '1', title: 'Batman Begins', overview: '', vote: 8, releaseDate: '', poster: '' },
  { id: '2', title: 'The Flash', overview: '', vote: 7, releaseDate: '', poster: '' },
]

describe('DashboardController', () => {
  let getTrendingMoviesMock: ReturnType<typeof vi.fn>
  let getComingSoonMock: ReturnType<typeof vi.fn>
  let getMovieByTitleMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()

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

  it('filters movies by title', async () => {
    const user = userEvent.setup()

    renderDashboard()

    const input = await screen.findByTestId('search')

    await user.type(input, 'flash{Enter}')

    expect(await screen.findByText(/flash/i)).toBeInTheDocument()
    expect(screen.queryByText(/batman/i)).not.toBeInTheDocument()

    await user.clear(input)

    expect(await screen.findByText(/batman/i)).toBeInTheDocument()
  })

  it('triggers navigation when clicking a movie card', async () => {
    const user = userEvent.setup()

    renderDashboard()

    const movie = await screen.findByText(/batman/i)
    await user.click(movie)

    expect(mockNavigate).toHaveBeenCalledWith('/movieDetails/1')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })
})

const renderDashboard = () => render(<Dashboard />)
