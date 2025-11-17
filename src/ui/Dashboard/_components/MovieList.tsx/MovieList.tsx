import type { FC } from 'react'
import { MovieCard } from 'ui/_components/atoms/MovieCard'
import type { Movie } from 'core/Movies/domain/Movie'

interface Props {
  movies: Movie[]
}

export const MovieList: FC<Props> = ({ movies }) => {
  return (
    <div>
      <h2 className="font-black text-2xl ml-5">Trending Movie List</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
