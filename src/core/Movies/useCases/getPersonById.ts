import type { MoviesRepository } from "../domain/MoviesRepository"

interface Dependencies {
    apiMoviesRepository: MoviesRepository
  }
  
  export const getPersonById =
    ({ apiMoviesRepository }: Dependencies) =>
    (id: string) =>
      apiMoviesRepository.getPersonById(id)
  