import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HeaderController } from '../HeaderController'
import { useNavigate } from 'react-router'

// Mocks
vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  Link: ({ children }: any) => <div>{children}</div>
}))

// Mock Header to avoid testing its implementation details again
vi.mock('../Header', () => ({
  Header: ({ handleIsVisible, visible, onClose, onSearch, handleSelectGenre, onFavoritesClick }: any) => (
    <div data-testid="mock-header">
      <button onClick={handleIsVisible} data-testid="toggle-visible">Toggle Visible</button>
      {visible && <div data-testid="visible-content">Visible</div>}
      <button onClick={onClose} data-testid="close">Close</button>
      <button onClick={() => onSearch('query')} data-testid="search">Search</button>
      <button onClick={() => onSearch('')} data-testid="search-empty">Search Empty</button>
      <button onClick={() => handleSelectGenre(123)} data-testid="select-genre">Select Genre</button>
      <button onClick={onFavoritesClick} data-testid="favorites">Favorites</button>
    </div>
  ),
}))

describe('HeaderController', () => {
  const navigateMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNavigate).mockReturnValue(navigateMock)
  })

  it('renders Header', () => {
    render(<HeaderController />)
    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
  })

  it('toggles visibility', () => {
    render(<HeaderController />)
    expect(screen.queryByTestId('visible-content')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('toggle-visible'))
    expect(screen.getByTestId('visible-content')).toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('toggle-visible'))
    expect(screen.queryByTestId('visible-content')).not.toBeInTheDocument()
  })

  it('closes visibility', () => {
    render(<HeaderController />)
    fireEvent.click(screen.getByTestId('toggle-visible')) // Make it visible first
    expect(screen.getByTestId('visible-content')).toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('close'))
    expect(screen.queryByTestId('visible-content')).not.toBeInTheDocument()
  })

  it('navigates to genre and closes menu', () => {
    render(<HeaderController />)
    fireEvent.click(screen.getByTestId('toggle-visible')) // Make it visible
    
    fireEvent.click(screen.getByTestId('select-genre'))
    
    expect(navigateMock).toHaveBeenCalledWith('/genre/123')
    expect(screen.queryByTestId('visible-content')).not.toBeInTheDocument()
  })

  it('navigates to search and closes menu', () => {
    render(<HeaderController />)
    fireEvent.click(screen.getByTestId('toggle-visible')) // Make it visible
    
    fireEvent.click(screen.getByTestId('search'))
    
    expect(navigateMock).toHaveBeenCalledWith('/search?q=query')
    expect(screen.queryByTestId('visible-content')).not.toBeInTheDocument()
  })

  it('does not navigate on empty search', () => {
    render(<HeaderController />)
    fireEvent.click(screen.getByTestId('search-empty'))
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('navigates to favorites and closes menu', () => {
    render(<HeaderController />)
    fireEvent.click(screen.getByTestId('toggle-visible')) // Make it visible
    
    fireEvent.click(screen.getByTestId('favorites'))
    
    expect(navigateMock).toHaveBeenCalledWith('/favorites')
    expect(screen.queryByTestId('visible-content')).not.toBeInTheDocument()
  })
})
