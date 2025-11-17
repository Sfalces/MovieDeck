import type { FC } from 'react'
import { SearchBar } from './_components/SearchBar.tsx'
import { Poster } from './_components/Poster.tsx'
import MovieCarousel from '../_components/molecules/MovieCarousel/MovieCarousel.tsx'
import { MovieList } from './_components/MovieList.tsx'
import type { Movie } from 'core/Movies/domain/Movie.ts'

interface Props {
  movies: Movie[]
  upComingMovies: Movie[]
  onSearch: (query: string) => void
}

export const Dashboard: FC<Props> = ({ movies, onSearch, upComingMovies }) => {
  return (
    <div className="text-white h-auto p-4 flex flex-col gap-4">
      <Poster />
      <SearchBar onSearch={onSearch} />
      <MovieList movies={movies} />
      <MovieCarousel movies={upComingMovies} title="Coming Soon" />
    </div>
  )
}
