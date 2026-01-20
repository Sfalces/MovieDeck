import { render, screen } from '@testing-library/react'
import { useInject } from '_di/container'
import { aMovieDetails } from 'core/Movies/infrastructure/__builders__/MovieDetailsBuilder'
import { vi, expect } from 'vitest'
import { MovieListByGenre } from 'ui/MovieListByGenre'
import userEvent from '@testing-library/user-event'

const mockUseParams = vi.hoisted(() => vi.fn())
const mockNavigate = vi.hoisted(() => vi.fn())


vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useParams: mockUseParams,
    Link: ({ to, children }: any) => (
      <button data-testid={`link-${to}`} onClick={() => mockNavigate(to)}>
        {children}
      </button>
    ),
  }
})
const moviesByGender = [aMovieDetails(), aMovieDetails({ id: '2', title: 'The Flash' })]

describe('MovieDetails', () => {
  let getMovieByGenderMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
    mockUseParams.mockReturnValue({ id: '28' })

    getMovieByGenderMock = vi.fn().mockResolvedValue(moviesByGender)
    ;(useInject as any).mockImplementation((key: string) => {
      switch (key) {
        case 'getMovieByGender':
          return getMovieByGenderMock
        default:
          throw new Error(`Unexpected dependency: ${key}`)
      }
    })
  })

  it('should render A movie List', async () => {
    renderMovieListByGenre()

    expect(getMovieByGenderMock).toHaveBeenCalled()
    expect(await screen.findByText('The Flash')).toBeInTheDocument()
  })

  it('should show the gender name', async () => {
    renderMovieListByGenre()

    screen.debug()

    expect(await screen.findByText('Action Movie List')).toBeInTheDocument()
  })

  it('should navigate to the movie details page when clicking on a movie card', async () => {
    renderMovieListByGenre()

    const movieCard = await screen.findByText('The Flash')
    await userEvent.click(movieCard)

    expect(mockNavigate).toHaveBeenCalledWith('/movieDetails/2')
  })
})

const renderMovieListByGenre = () => render(<MovieListByGenre />)
