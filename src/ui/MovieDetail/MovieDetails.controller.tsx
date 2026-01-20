import { useParams } from 'react-router'
import { useInject } from '_di/container'
import { useEffect, useState } from 'react'
import type { Movie, MovieVideos } from 'core/Movies/domain/Movie'
import { MovieDetails } from './MovieDetails'
import type { MovieCredits } from 'core/Movies/domain/MovieCredits'
import { Spinner } from 'ui/_components/atoms/Spinner'

export const MovieDetailsController = () => {
  const { id } = useParams<{ id: string }>()
  const getMovieDetails = useInject('getMovieById')
  const getTrailer = useInject('getMovieVideos')
  const getSimilarMovies = useInject('getSimilarMovies')
  const getCredits = useInject('getMovieCredits')
  const [credits, setCredits] = useState<MovieCredits | undefined>()
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

    const fetchCredits = async () => {
      const credits = await getCredits(id!)
      setCredits(credits)
    }

    fetchMovie()
    fetchTrailer()
    fetchSimilarMovies()
    fetchCredits()
  }, [id])

  if (!movieDetails || !trailer || !credits) {
    return <Spinner />
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
      credits={credits}
    />
  )
}
