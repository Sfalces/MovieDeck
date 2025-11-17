import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getMovieCredits =
  ({ apiMoviesRepository }: Dependencies) =>
  (id: string) =>
    apiMoviesRepository.getMovieCredits(id)
