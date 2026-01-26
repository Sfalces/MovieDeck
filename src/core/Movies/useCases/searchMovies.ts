import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const searchMovies =
  ({ apiMoviesRepository }: Dependencies) =>
  (query: string) =>
    apiMoviesRepository.searchMovies(query)
