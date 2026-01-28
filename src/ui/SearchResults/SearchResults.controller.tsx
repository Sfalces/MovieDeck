import { useEffect, useState } from 'react'
import { Spinner } from 'ui/_components/atoms/Spinner'
import type { Movie } from 'core/Movies/domain/Movie'
import { SearchResults } from './SearchResults'
import { useSearchParams } from 'react-router'
import { useInject } from '_di/container'

export const SearchResultsController = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const searchMovies = useInject('searchMovies')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (!query) {
      setMovies([])
      setError(null)
      setIsLoading(false)
      return
    }

    const abortController = new AbortController()

    const fetchMovies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const results = await searchMovies(query, abortController.signal, 20)
        if (abortController.signal.aborted) {
          return
        }

        const sortedResults = [...results].sort((a, b) => {
          return b.popularity - a.popularity
        })

        setMovies(sortedResults)
      } catch (err) {
        if (abortController.signal.aborted) {
          return
        }

        setError('We could not find the movies. Please try again.')
        setMovies([])
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
  }, [query, retryKey, searchMovies])

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1)
  }

  if (!query) {
    return (
      <div className="px-5 py-10 text-white">
        <p className="text-lg font-semibold">Ingresa una consulta para buscar películas.</p>
      </div>
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="px-5 py-10 text-center text-white space-y-4">
        <p className="text-lg font-semibold">{error}</p>
        <button
          className="px-4 py-2 rounded-md border border-cyan-500 text-white font-semibold"
          onClick={handleRetry}
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="px-5 py-10 text-white">
        <p className="text-lg font-semibold">No results for "{query}"</p>
      </div>
    )
  }

  return <SearchResults movies={movies} query={query} />
}
