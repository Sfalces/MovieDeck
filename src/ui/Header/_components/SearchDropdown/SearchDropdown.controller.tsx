import { useEffect, useRef, useState, type FC } from 'react'
import { useInject } from '_di/container'
import type { Movie } from 'core/Movies/domain/Movie'
import { useDebounce } from 'ui/_hooks/useDebounce'
import { SearchDropdown } from './SearchDropdown'

interface Props {
  searchQuery: string
  onSelectMovie: (movieId: string) => void
  onClose: () => void
}

export const SearchDropdownController: FC<Props> = ({
  searchQuery,
  onSelectMovie,
  onClose
}) => {
  const searchMovies = useInject('searchMovies')

  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(searchQuery, 300)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([])
      setIsLoading(false)
      setError(null)
      return
    }

    // cancel previous request
    abortControllerRef.current?.abort()
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    const fetchMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const movies = await searchMovies(debouncedQuery.trim(), abortController.signal, 5)
        const sortedResults = [...movies].sort((a, b) => {
          return b.popularity - a.popularity
        })

        setResults(sortedResults)
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to search movies')
          setResults([])
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchMovies()

    return () => {
      abortController.abort()
    }
  }, [debouncedQuery, searchMovies])

  const handleSelectMovie = (movieId: string) => {
    onSelectMovie(movieId)
    onClose()
  }

  if (debouncedQuery.trim().length < 2) {
    return null
  }

  return (
    <SearchDropdown
      results={results}
      isLoading={isLoading}
      error={error}
      onSelectMovie={handleSelectMovie}
      onClose={onClose}
    />
  )
}
