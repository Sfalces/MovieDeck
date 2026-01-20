import { useEffect, useState } from 'react'
import { MovieListByGenre } from './MovieListByGenre'
import type { Movie } from 'core/Movies/domain/Movie'
import { useParams } from 'react-router'
import { useInject } from '_di/container'
import { MovieGenreNames } from 'core/Movies/domain/MovieGenre'
import { Spinner } from 'ui/_components/atoms/Spinner'

export const MovieListByGenreController = () => {
  const { id } = useParams<{ id: string }>()
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined)
  const getMovieByGender = useInject('getMovieByGender')
  const genreName = id ? MovieGenreNames[Number(id)] : 'Unknown'

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovieByGender(id!)
      setMovies(movies)
    }

    fetchMovies()
  }, [id])

  if (!movies) {
    return <Spinner />
  }

  return <MovieListByGenre movies={movies} genreName={genreName} />
}
