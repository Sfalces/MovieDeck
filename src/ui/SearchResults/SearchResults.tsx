import type { FC } from 'react'
import type { Movie } from 'core/Movies/domain/Movie'
import { MovieCard } from '../_components/atoms/MovieCard'

interface Props {
  movies: Movie[]
  query: string
}

export const SearchResults: FC<Props> = ({ movies, query }) => (
  <section className="px-5 pb-10">
    <p className="text-xl font-semibold text-white">
      Search results {query ? `for "${query}"` : ''}
    </p>
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </section>
)
