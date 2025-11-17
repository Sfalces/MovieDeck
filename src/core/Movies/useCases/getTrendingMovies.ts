import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getTrendingMovies =
  ({ apiMoviesRepository }: Dependencies) =>
  () =>
    apiMoviesRepository.getTrendingMovies()
