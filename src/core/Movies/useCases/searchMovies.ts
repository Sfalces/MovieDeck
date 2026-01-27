import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const searchMovies =
  ({ apiMoviesRepository }: Dependencies) =>
  (query: string, signal?: AbortSignal) =>
    apiMoviesRepository.searchMovies(query, signal)
