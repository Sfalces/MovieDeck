import type { MoviesRepository } from '../domain/MoviesRepository'

interface Dependencies {
  apiMoviesRepository: MoviesRepository
}

export const getMovieVideos =
  ({ apiMoviesRepository }: Dependencies) =>
  (id: string) =>
    apiMoviesRepository.getMovieVideos(id)
