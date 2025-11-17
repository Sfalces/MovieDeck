import { useParams } from 'react-router'
import { useInject } from '_di/container'
import { useEffect, useState } from 'react'
import type { Movie, MovieVideos } from 'core/Movies/domain/Movie'
import { MovieDetails } from './MovieDetails'

export const MovieDetailsController = () => {
  const { id } = useParams<{ id: string }>()
  const getMovieDetails = useInject('getMovieById')
  const getTrailer = useInject('getMovieVideos')
  const getSimilarMovies = useInject('getSimilarMovies')
  const [movieDetails, setMovieDetails] = useState<Movie | undefined>()
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [trailer, setTrailer] = useState<MovieVideos | undefined>()

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovieDetails(id!)
      setMovieDetails(movie)
    }

    const fetchTrailer = async () => {
      const trailer = await getTrailer(id!)
      setTrailer(trailer)
    }

    const fetchSimilarMovies = async () => {
      const similarMovies = await getSimilarMovies(id!)
      setSimilarMovies(similarMovies)
    }

    fetchMovie()
    fetchTrailer()
    fetchSimilarMovies()
  }, [id])

  if (!movieDetails || !trailer) {
    return (
      <div className="loader-container">
        <div className="spinner" />
      </div>
    )
  }
  return (
    <MovieDetails
      poster={movieDetails.poster}
      budget={movieDetails.budget}
      genres={movieDetails.genres}
      overview={movieDetails.overview}
      trailer={trailer}
      releaseDate={movieDetails.releaseDate}
      revenue={movieDetails.revenue}
      runtime={movieDetails.runtime}
      title={movieDetails.title}
      vote={movieDetails.vote}
      similarMovies={similarMovies}
    />
  )
}
