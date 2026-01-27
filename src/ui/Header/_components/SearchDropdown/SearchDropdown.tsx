import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import type { Movie } from 'core/Movies/domain/Movie'
import { SearchDropdownItem } from './_components/SearchDropdownItem'

interface Props {
  results: Movie[]
  isLoading: boolean
  error: string | null
  onSelectMovie: (movieId: string) => void
  onClose: () => void
}

export const SearchDropdown: FC<Props> = ({ results, isLoading, error, onSelectMovie, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Handle keyboard navigation for dropdown items
  useEffect(() => {
    if (results.length === 0) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((prev) => {
          if (prev < 0) {
            return 0
          }
          return (prev + 1) % results.length
        })
        setHasKeyboardFocus(true)
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((prev) => {
          if (prev <= 0) {
            return results.length - 1
          }
          return prev - 1
        })
        setHasKeyboardFocus(true)
      }

      if (event.key === 'Enter') {
        if (!hasKeyboardFocus) {
          return
        }

        event.preventDefault()
        const selectedMovie = activeIndex >= 0 ? results[activeIndex] : undefined
        if (selectedMovie) {
          onSelectMovie(selectedMovie.id)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [results, activeIndex, onSelectMovie, hasKeyboardFocus])

  useEffect(() => {
    setActiveIndex(-1)
    setHasKeyboardFocus(false)
  }, [results])

  if (isLoading) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-1/4 bg-cyan-900 border-2 border-cyan-300 rounded-lg shadow-xl z-50 overflow-hidden"
      >
        <div className="flex items-center justify-center p-4">
          <div className="w-6 h-6 border-2 border-t-cyan-300 border-gray-600 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-1/4 bg-cyan-900 border-2 border-cyan-300 rounded-lg shadow-xl z-50"
      >
        <div className="p-4 text-white text-center">{error}</div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-1/4 bg-cyan-900 border-2 border-cyan-300 rounded-lg shadow-xl z-50"
      >
        <div className="p-4 text-white text-center">No movies found</div>
      </div>
    )
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full bg-cyan-900 border-2 border-cyan-300 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
      data-testid="search-dropdown"
    >
      <ul className="divide-y divide-cyan-700" role="listbox">
        {results.map((movie, index) => (
        <SearchDropdownItem
          key={movie.id}
          movie={movie}
          onSelect={onSelectMovie}
          isActive={hasKeyboardFocus && index === activeIndex}
        />
        ))}
      </ul>
    </div>
  )
}