import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getMovieByTitle =
  ({ apiMoviesRepository }: Dependencies) =>
  (title: string) =>
    apiMoviesRepository.getMovieByTitle(title)
