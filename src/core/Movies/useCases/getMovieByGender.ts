import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getMovieByGender =
  ({ apiMoviesRepository }: Dependencies) =>
  (gender: string) =>
    apiMoviesRepository.getMovieByGender(gender)
