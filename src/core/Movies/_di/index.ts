import { asFunction } from '../../../_di/resolvers'
import type { MoviesRepository } from '../domain/MoviesRepository'
import { apiMoviesRepository } from '../infrastructure/apiMoviesRepository'
import { getComingSoon } from '../useCases/getComingSoon'
import { getMovieByGender } from '../useCases/getMovieByGender'
import { getMovieById } from '../useCases/getMovieById'
import { getMovieByTitle } from '../useCases/getMovieByTitle'
import { getMovieCredits } from '../useCases/getMovieCredits'
import { getMovieVideos } from '../useCases/getMovieVideos'
import { getSimilarMovies } from '../useCases/getSimilarMovies'
import { getTrendingMovies } from '../useCases/getTrendingMovies'

export const moviesModules = {
  apiMoviesRepository: asFunction<MoviesRepository>(apiMoviesRepository),
  getTrendingMovies: asFunction(getTrendingMovies),
  getMovieById: asFunction(getMovieById),
  getMovieCredits: asFunction(getMovieCredits),
  getMovieVideos: asFunction(getMovieVideos),
  getSimilarMovies: asFunction(getSimilarMovies),
  getMovieByTitle: asFunction(getMovieByTitle),
  getComingSoon: asFunction(getComingSoon),
  getMovieByGender: asFunction(getMovieByGender),
}
