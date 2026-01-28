import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const searchMovies =
  ({ apiMoviesRepository }: Dependencies) =>
  (query: string, signal?: AbortSignal, limit?: number) =>
    apiMoviesRepository.searchMovies(query, signal, limit)
