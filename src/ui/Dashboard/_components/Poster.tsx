import { useEffect, useState } from 'react'
import { useInject } from '_di/container'
import type { Movie } from 'core/Movies/domain/Movie'
import { Link } from 'react-router'

export const Poster = () => {
  const getMoviesByTitle = useInject('getMovieByTitle')
  const [movie, setMovie] = useState<Movie | undefined>(undefined)

  useEffect(() => {
    const fetchMovieByTitle = async () => {
      const movie = await getMoviesByTitle('the lord of the rings the fellowship of the ring')
      setMovie(movie)
    }

    fetchMovieByTitle()
  }, [])

  if (!movie) {
    return (
      <div className="loader-container text-white h-svh">
        <div data-testid="loader" className="spinner" />
      </div>
    )
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <h4 className="text-2xl text-white font-black ml-5 self-start mb-2">Weekly recommendation</h4>
      <Link to={`/movieDetails/${movie.id}`} className="w-4/5 relative cursor-pointer">
        <div className="relative">
          <img
            className="h-120 w-full object-cover rounded-2xl shadow-lg"
            src={movie.poster}
            alt={movie.title}
          />
          <h2 className="absolute bottom-4 left-6 text-white text-xl font-bold drop-shadow-lg">
            {movie.title}
          </h2>
        </div>
      </Link>
    </div>
  )
}
