import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getSimilarMovies =
  ({ apiMoviesRepository }: Dependencies) =>
  (id: string) =>
    apiMoviesRepository.getSimilarMovies(id)
