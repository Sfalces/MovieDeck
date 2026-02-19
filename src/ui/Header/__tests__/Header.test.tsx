import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '../Header'

// Mocks
vi.mock('react-router', () => ({
  Link: ({ children, onClick, to }: any) => (
    <a href={to} onClick={onClick} data-testid="mock-link">
      {children}
    </a>
  ),
}))

vi.mock('../../_components/atoms/IconButton', () => ({
  IconButton: ({ onClick, name }: any) => (
    <button onClick={onClick} data-testid={`icon-button-${name}`}>
      {name}
    </button>
  ),
}))

vi.mock('../_components/FilterMenu', () => ({
  FilterMenu: ({ onClose, onSelectGenre }: any) => (
    <div data-testid="filter-menu">
      <button onClick={onClose} data-testid="close-filter">Close</button>
      <button onClick={() => onSelectGenre(1)} data-testid="select-genre">Genre 1</button>
    </div>
  ),
}))

vi.mock('../_components/SearchBar', () => ({
  SearchBar: ({ onSearch }: any) => (
    <input
      data-testid="search-bar"
      onChange={(e) => onSearch(e.target.value)}
    />
  ),
}))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Header', () => {
  const defaultProps = {
    visible: false,
    handleIsVisible: vi.fn(),
    onClose: vi.fn(),
    handleSelectGenre: vi.fn(),
    onSearch: vi.fn(),
    onFavoritesClick: vi.fn(),
  }

  it('renders correctly', () => {
    render(<Header {...defaultProps} />)
    expect(screen.getByText('MovieDeck')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
    expect(screen.queryByTestId('filter-menu')).not.toBeInTheDocument()
  })

  it('calls handleIsVisible when filter button is clicked', () => {
    render(<Header {...defaultProps} />)
    fireEvent.click(screen.getByTestId('icon-button-filter'))
    expect(defaultProps.handleIsVisible).toHaveBeenCalled()
  })

  it('calls onFavoritesClick when favorites button is clicked', () => {
    render(<Header {...defaultProps} />)
    fireEvent.click(screen.getByText('Favorites'))
    expect(defaultProps.onFavoritesClick).toHaveBeenCalled()
  })

  it('renders FilterMenu when visible is true', () => {
    render(<Header {...defaultProps} visible={true} />)
    expect(screen.getByTestId('filter-menu')).toBeInTheDocument()
  })

  it('calls onClose when FilterMenu close button is clicked', () => {
    render(<Header {...defaultProps} visible={true} />)
    fireEvent.click(screen.getByTestId('close-filter'))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('calls handleSelectGenre when a genre is selected in FilterMenu', () => {
    render(<Header {...defaultProps} visible={true} />)
    fireEvent.click(screen.getByTestId('select-genre'))
    expect(defaultProps.handleSelectGenre).toHaveBeenCalledWith(1)
  })

  it('calls onSearch when typing in SearchBar', () => {
    render(<Header {...defaultProps} />)
    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'test' } })
    expect(defaultProps.onSearch).toHaveBeenCalledWith('test')
  })
  
  it('scrolls to top when clicking the logo', () => {
     const scrollToMock = vi.fn()
     window.scrollTo = scrollToMock
     render(<Header {...defaultProps} />)
     fireEvent.click(screen.getByText('MovieDeck'))
     expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
