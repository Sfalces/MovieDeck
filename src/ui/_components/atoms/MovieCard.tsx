import type { FC } from 'react'
import { Link } from 'react-router'
import type { Movie } from 'core/Movies/domain/Movie'

interface Props {
  movie: Movie
}

export const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 cursor-pointer">
      <Link to={`/movieDetails/${movie.id}`}>
        <div className="bg-gradient-to-br from-black to-cyan-500 p-4 rounded-lg text-white shadow-lg border-cyan-300 border-1 ">
          <img src={movie.poster} className="w-full h-72 rounded-md mb-2 " alt={movie.title} />
          <h2 className="text-lg font-semibold line-clamp-1">{movie.title}</h2>
        </div>
      </Link>
    </div>
  )
}
