import { render, screen, waitFor } from '@testing-library/react'
import { useInject } from '_di/container'
import { expect, vi, describe, it, beforeEach } from 'vitest'
import { ActorDetail } from '..'
import { aPerson } from 'core/Movies/infrastructure/__builders__/PersonBuilder'

const mockUseParams = vi.hoisted(() => vi.fn())
const mockNavigate = vi.hoisted(() => vi.fn())

vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
  return {
    ...actual,
    useParams: mockUseParams,
    useNavigate: () => mockNavigate,
  }
})

describe('ActorDetailController', () => {
  let getPersonByIdMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
    mockUseParams.mockReturnValue({ id: '123' })

    getPersonByIdMock = vi.fn()
    ;(useInject as any).mockImplementation((key: string) => {
      switch (key) {
        case 'getPersonById':
          return getPersonByIdMock
        default:
          throw new Error(`Unexpected dependency: ${key}`)
      }
    })
  })

  it('shows a spinner while loading', async () => {
    getPersonByIdMock.mockImplementation(() => new Promise(() => {}))

    const { container } = render(<ActorDetail />)

    await waitFor(() => expect(getPersonByIdMock).toHaveBeenCalledWith('123'))
    expect(container.querySelector('.animate-spin')).toBeTruthy()
  })

  it('renders actor details when fetch succeeds', async () => {
    getPersonByIdMock.mockResolvedValue(aPerson())

    render(<ActorDetail />)

    expect(getPersonByIdMock).toHaveBeenCalledWith('123')
    expect(await screen.findByRole('heading', { name: 'Christopher Nolan' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Biography' })).toBeInTheDocument()
  })

  it('renders an error message when fetch fails', async () => {
    getPersonByIdMock.mockRejectedValue(new Error('boom'))

    render(<ActorDetail />)

    expect(getPersonByIdMock).toHaveBeenCalledWith('123')
    expect(await screen.findByText('Could not load actor details.')).toBeInTheDocument()
  })
})

