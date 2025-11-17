import type { FC } from 'react'
import type { Movie } from 'core/Movies/domain/Movie'
import { MovieCard } from '../_components/atoms/MovieCard'

interface Props {
  movies: Movie[]
  genreName: string
}

export const MovieListByGenre: FC<Props> = ({ movies, genreName }) => {
  return (
    <div>
      <h2 className="font-black text-2xl ml-5 text-white">{genreName} Movie List</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
