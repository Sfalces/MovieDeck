import { useEffect, useState } from 'react'
import { Dashboard } from './Dashboard'
import { useInject } from '_di/container'
import type { Movie } from 'core/Movies/domain/Movie'
import { Spinner } from 'ui/_components/atoms/Spinner'

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

  if (!movies) {
    return <Spinner />
  }

  return (
    <Dashboard
      movies={movies.slice(0, 12)}
      upComingMovies={upComingMovies}
    />
  )
}
