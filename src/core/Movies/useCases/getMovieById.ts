import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getMovieById =
  ({ apiMoviesRepository }: Dependencies) =>
  (id: string) =>
    apiMoviesRepository.getMovieById(id)
