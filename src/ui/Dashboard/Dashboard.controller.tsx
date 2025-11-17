import { useEffect, useState } from 'react'
import { Dashboard } from './Dashboard'
import { useInject } from '_di/container'
import type { Movie } from 'core/Movies/domain/Movie'

export const DashboardController = () => {
  const getTrendingMovies = useInject('getTrendingMovies')
  const getUpcomingMovies = useInject('getComingSoon')
  const [movies, setMovies] = useState<Movie[] | undefined>([])
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [upComingMovies, setUpcomingMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await getTrendingMovies()
      setMovies(trendingMovies || [])
      setAllMovies(trendingMovies || [])
    }

    const fetchUpcomingMovies = async () => {
      const upcomingMovies = await getUpcomingMovies()
      setUpcomingMovies(upcomingMovies)
    }

    fetchMovies()
    fetchUpcomingMovies()
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setMovies(allMovies)
      return
    }

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    )
    setMovies(filtered)
  }

  if (!movies) {
    return (
      <div className="loader-container text-white  h-svh">
        <div data-testid={'loader'} className="spinner" />
      </div>
    )
  }

  return (
    <Dashboard
      movies={movies.slice(0, 12)}
      onSearch={handleSearch}
      upComingMovies={upComingMovies}
    />
  )
}
