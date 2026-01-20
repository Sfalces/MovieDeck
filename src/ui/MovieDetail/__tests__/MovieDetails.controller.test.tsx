import { render, screen } from '@testing-library/react'
import { useInject } from '_di/container'
import { aMovieCredits } from 'core/Movies/infrastructure/__builders__/MovieCreditsBuilder'
import { aMovieDetails } from 'core/Movies/infrastructure/__builders__/MovieDetailsBuilder'
import { aMovieVideos } from 'core/Movies/infrastructure/__builders__/MovieVideosBuilder'
import { vi, expect } from 'vitest'
import { MovieDetails } from '..'
import userEvent from '@testing-library/user-event'

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
const movieDetailsMock = aMovieDetails()
const movieVideosMock = aMovieVideos()
const similarMoviesMock = [
  aMovieDetails({ id: '3', title: 'The lord of the rings' }),
  aMovieDetails({ id: '2', title: 'The Flash' }),
]
const movieCreditsMock = aMovieCredits()

describe('MovieDetails', () => {
  let getMovieByIdMock: ReturnType<typeof vi.fn>
  let getMovieVideosMock: ReturnType<typeof vi.fn>
  let getSimilarMoviesMock: ReturnType<typeof vi.fn>
  let getMovieCreditsMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()

    getMovieByIdMock = vi.fn().mockResolvedValue(movieDetailsMock)
    getMovieVideosMock = vi.fn().mockResolvedValue(movieVideosMock)
    getSimilarMoviesMock = vi.fn().mockResolvedValue(similarMoviesMock)
    getMovieCreditsMock = vi.fn().mockResolvedValue(movieCreditsMock)
    ;(useInject as any).mockImplementation((key: string) => {
      switch (key) {
        case 'getMovieById':
          return getMovieByIdMock
        case 'getMovieVideos':
          return getMovieVideosMock
        case 'getSimilarMovies':
          return getSimilarMoviesMock
        case 'getMovieCredits':
          return getMovieCreditsMock
        default:
          throw new Error(`Unexpected dependency: ${key}`)
      }
    })
  })

  it('should render MovieDetails', async () => {
    renderMovieDetails()

    expect(getMovieByIdMock).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('Batman Begins')).toBeInTheDocument()
  })

  it('should render the cast', async () => {
    renderMovieDetails()

    expect(getMovieCreditsMock).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('Christian Bale')).toBeInTheDocument()
  })

  it('should render the similarMovies', async () => {
    renderMovieDetails()

    expect(getSimilarMoviesMock).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('The lord of the rings')).toBeInTheDocument()
  })

  it('should navigate to another movie when clicking a similar movie card', async () => {
    renderMovieDetails()

    const similarMovie = await screen.findByText('The lord of the rings')

    await userEvent.click(similarMovie)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/movieDetails/3')
  })
})

const renderMovieDetails = () => render(<MovieDetails />)
