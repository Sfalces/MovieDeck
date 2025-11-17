import type { Movie, MovieVideos } from './Movie'
import type { MovieCredits } from './MovieCredits'

export interface MoviesRepository {
  getTrendingMovies: () => Promise<Movie[]>
  getMovieById: (id: string) => Promise<Movie>
  getMovieCredits: (id: string) => Promise<MovieCredits>
  getMovieVideos: (id: string) => Promise<MovieVideos>
  getSimilarMovies: (id: string) => Promise<Movie[]>
  getMovieByTitle: (title: string) => Promise<Movie>
  getComingSoon: () => Promise<Movie[]>
  getMovieByGender: (genre: string) => Promise<Movie[]>
}
