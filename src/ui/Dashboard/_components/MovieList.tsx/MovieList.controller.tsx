import { MovieList } from './MovieList'
import type { Movie } from 'core/Movies/domain/Movie'
import type { FC } from 'react'

interface Props {
  movies: Movie[]
}

export const MovieListController: FC<Props> = ({ movies }) => {
  return <MovieList movies={movies} />
}
