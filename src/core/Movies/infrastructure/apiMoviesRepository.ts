import type { ApiClient } from '../../Shared/domain/ApiClient'
import type { Movie, MovieVideos, Person } from '../domain/Movie'
import type { MovieCredits } from '../domain/MovieCredits'
import type { MoviesRepository } from '../domain/MoviesRepository'
import { MovieCreditsDtoSchema } from './_dto/MovieCreditsDto'
import { MovieDetailsDtoSchema } from './_dto/MovieDto'
import { TrendingMoviesDtoSchema } from './_dto/MovieSummary'
import { MovieVideosDtoSchema } from './_dto/MovieTrailerDto'
import { PersonDtoSchema } from './_dto/PersonDto'
import { MovieCreditsMapper } from './_mappers/MovieCreditsMapper'
import { movieDetailsMapToDomain, movieSummaryMapToDomain } from './_mappers/MovieMapper'
import { MovieVideosMapper } from './_mappers/MovieVideosMapper'
import { PersonMapToDomain } from './_mappers/PersonMapper'

interface Dependencies {
  apiClient: ApiClient
}

const API_KEY = import.meta.env.VITE_API_KEY

export const apiMoviesRepository = ({ apiClient }: Dependencies): MoviesRepository => ({
  getTrendingMovies: async (): Promise<Movie[]> => {
    const response = await apiClient.get(`/trending/movie/day?api_key=${API_KEY}`)
    const parsed = TrendingMoviesDtoSchema.parse(response.data)
    return parsed.results.map(movieSummaryMapToDomain)
  },

  getMovieById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
    const parsed = MovieDetailsDtoSchema.parse(response.data)
    return movieDetailsMapToDomain(parsed)
  },

  getMovieCredits: async (id: string): Promise<MovieCredits> => {
    const response = await apiClient.get(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    const parsed = MovieCreditsDtoSchema.parse(response.data)
    return MovieCreditsMapper.fromDto(parsed)
  },

  getMovieVideos: async (id: string): Promise<MovieVideos> => {
    const response = await apiClient.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    const parsed = MovieVideosDtoSchema.parse(response.data)
    return MovieVideosMapper.fromDto(parsed)
  },

  getSimilarMovies: async (id: string): Promise<Movie[]> => {
    const response = await apiClient.get(
      `/movie/${id}/similar?api_key=${API_KEY}&language=en-EU&page=1`,
    )
    const parsed = TrendingMoviesDtoSchema.parse(response.data)
    return parsed.results.map(movieSummaryMapToDomain)
  },

  getMovieByTitle: async (title: string): Promise<Movie> => {
    const response = await apiClient.get(`/search/movie?api_key=${API_KEY}&query=${title}`)
    const parsed = TrendingMoviesDtoSchema.parse(response.data)
    return parsed.results.map(movieSummaryMapToDomain)[0]
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await apiClient.get(`/search/movie?api_key=${API_KEY}&query=${query}`)
    const parsed = TrendingMoviesDtoSchema.parse(response.data)
    return parsed.results.map(movieSummaryMapToDomain).slice(0, 5)
  },

  getComingSoon: async (): Promise<Movie[]> => {
    const response = await apiClient.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    const parsed = TrendingMoviesDtoSchema.parse(response.data)
    return parsed.results.map(movieSummaryMapToDomain)
  },

  getMovieByGender: async (genre: string): Promise<Movie[]> => {
    const response = await apiClient.get(
      `/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=es-ES&sort_by=popularity.desc&page=1`,
    )
    const parsed = TrendingMoviesDtoSchema.parse(response.data)
    return parsed.results.map(movieSummaryMapToDomain)
  },

  getPersonById: async (id: string): Promise<Person> => {
    const response = await apiClient.get(`/person/${id}?api_key=${API_KEY}&language=en-US`)
    const parsed = PersonDtoSchema.parse(response.data)
    return PersonMapToDomain(parsed)
  },
})
