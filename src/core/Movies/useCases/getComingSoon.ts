import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getComingSoon =
  ({ apiMoviesRepository }: Dependencies) =>
  () =>
    apiMoviesRepository.getComingSoon()
