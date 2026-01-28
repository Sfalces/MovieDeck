import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ApiClient } from '../../../Shared/domain/ApiClient'
import { aTrendingMoviesDto, aMovieSummaryDto } from '../__builders__/MovieSummaryDtoBuilder'
import { aMovieDetailsDto } from '../__builders__/MovieDetailsDtoBuilder'
import { aMovieCreditsDto } from '../__builders__/MovieCreditsDtoBuilder'
import { aMovieVideosDto } from '../__builders__/MovieVideosDtoBuilder'
import { aPersonDto } from '../__builders__/PersonDtoBuilder'
import { movieSummaryMapToDomain, movieDetailsMapToDomain } from '../_mappers/MovieMapper'
import { MovieCreditsMapper } from '../_mappers/MovieCreditsMapper'
import { MovieVideosMapper } from '../_mappers/MovieVideosMapper'
import { PersonMapToDomain } from '../_mappers/PersonMapper'

const TEST_API_KEY = 'test-api-key'

import { apiMoviesRepository } from '../apiMoviesRepository'

describe('apiMoviesRepository', () => {
  let mockApiClient: {
    get: ReturnType<typeof vi.fn> & ApiClient['get']
  }
  let repository: ReturnType<typeof apiMoviesRepository>

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock ApiClient
    mockApiClient = {
      get: vi.fn().mockResolvedValue({ data: {}, status: 200 }),
    }

    repository = apiMoviesRepository({ apiClient: mockApiClient })
  })

  describe('getTrendingMovies', () => {
    it('should fetch trending movies from the correct endpoint', async () => {
      const movie1 = aMovieSummaryDto()
      const movie2 = aMovieSummaryDto({
        id: 2,
        title: 'The Dark Knight',
        overview: 'Batman faces the Joker',
        vote_average: 9.0,
        release_date: '2008-07-18',
        poster_path: '/poster2.jpg',
      })

      const mockResponse = {
        data: aTrendingMoviesDto({
          results: [movie1, movie2],
        }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getTrendingMovies()

      expect(mockApiClient.get).toHaveBeenCalledWith(`/trending/movie/day?api_key=${TEST_API_KEY}`)
      expect(result).toEqual([movieSummaryMapToDomain(movie1), movieSummaryMapToDomain(movie2)])
    })
  })

  describe('getMovieById', () => {
    it('should fetch movie details by id from the correct endpoint', async () => {
      const movieDto = aMovieDetailsDto()
      const mockResponse = {
        data: movieDto,
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieById('123')

      expect(mockApiClient.get).toHaveBeenCalledWith(`/movie/123?api_key=${TEST_API_KEY}&language=en-US`)
      expect(result).toEqual(movieDetailsMapToDomain(movieDto))
    })

    it('should handle null poster_path correctly', async () => {
      const mockResponse = {
        data: aMovieDetailsDto({
          id: 123,
          title: 'Test Movie',
          overview: 'Test overview',
          vote_average: 7.0,
          release_date: '2023-01-01',
          poster_path: null,
          tagline: null,
          runtime: null,
          genres: [],
        }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieById('123')

      expect(result.poster).toBe('/placeholder.png')
      expect(result.tagline).toBeUndefined()
      expect(result.runtime).toBeUndefined()
      expect(result.genres).toEqual([])
    })
  })

  describe('getMovieCredits', () => {
    it('should fetch movie credits from the correct endpoint', async () => {
      const creditsDto = aMovieCreditsDto()
      const mockResponse = {
        data: creditsDto,
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieCredits('123')

      expect(mockApiClient.get).toHaveBeenCalledWith(`/movie/123/credits?api_key=${TEST_API_KEY}&language=en-US`)
      expect(result).toEqual(MovieCreditsMapper.fromDto(creditsDto))
    })
  })

  describe('getMovieVideos', () => {
    it('should fetch movie videos from the correct endpoint', async () => {
      const videosDto = aMovieVideosDto()
      const mockResponse = {
        data: videosDto,
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieVideos('123')

      expect(mockApiClient.get).toHaveBeenCalledWith(`/movie/123/videos?api_key=${TEST_API_KEY}&language=en-US`)
      expect(result).toEqual(MovieVideosMapper.fromDto(videosDto))
    })
  })

  describe('getSimilarMovies', () => {
    it('should fetch similar movies from the correct endpoint', async () => {
      const movie = aMovieSummaryDto({
        id: 456,
        title: 'The Prestige',
        overview: 'Two magicians duel',
        vote_average: 8.5,
        release_date: '2006-10-20',
        poster_path: '/prestige.jpg',
      })

      const mockResponse = {
        data: aTrendingMoviesDto({
          results: [movie],
        }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getSimilarMovies('123')

      expect(mockApiClient.get).toHaveBeenCalledWith(`/movie/123/similar?api_key=${TEST_API_KEY}&language=en-EU&page=1`)
      expect(result).toEqual([movieSummaryMapToDomain(movie)])
    })
  })

  describe('getMovieByTitle', () => {
    it('should search movies by title from the correct endpoint', async () => {
      const movie = aMovieSummaryDto({
        id: 550,
        title: 'Fight Club',
        overview: 'An insomniac office worker',
        vote_average: 8.4,
        release_date: '1999-10-15',
        poster_path: '/fightclub.jpg',
      })

      const mockResponse = {
        data: aTrendingMoviesDto({
          results: [movie, aMovieSummaryDto({ id: 551, title: 'Fight Club 2' })],
        }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieByTitle('Fight Club')

      expect(mockApiClient.get).toHaveBeenCalledWith(`/search/movie?api_key=${TEST_API_KEY}&query=Fight Club`)
      expect(result).toEqual(movieSummaryMapToDomain(movie))
    })
  })

  describe('searchMovies', () => {
    it('should search movies by query from the correct endpoint and return first 5 results', async () => {
      const movies = [
        aMovieSummaryDto({ id: 550, title: 'Fight Club', overview: 'An insomniac office worker', vote_average: 8.4, release_date: '1999-10-15', poster_path: '/fightclub.jpg' }),
        aMovieSummaryDto({ id: 551, title: 'Fight Club 2', overview: 'Sequel to Fight Club', vote_average: 6.0, release_date: '2020-01-01', poster_path: '/fightclub2.jpg' }),
        aMovieSummaryDto({ id: 552, title: 'Fight Club 3', overview: 'Third installment', vote_average: 5.5, release_date: '2021-01-01', poster_path: '/fightclub3.jpg' }),
        aMovieSummaryDto({ id: 553, title: 'Fight Club 4', overview: 'Fourth installment', vote_average: 5.0, release_date: '2022-01-01', poster_path: '/fightclub4.jpg' }),
        aMovieSummaryDto({ id: 554, title: 'Fight Club 5', overview: 'Fifth installment', vote_average: 4.5, release_date: '2023-01-01', poster_path: '/fightclub5.jpg' }),
        aMovieSummaryDto({ id: 555, title: 'Fight Club 6', overview: 'Sixth installment', vote_average: 4.0, release_date: '2024-01-01', poster_path: '/fightclub6.jpg' }),
      ]

      const mockResponse = {
        data: aTrendingMoviesDto({ results: movies }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const signal = new AbortController().signal
      const result = await repository.searchMovies('Fight Club', signal, 5)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/search/movie?api_key=${TEST_API_KEY}&query=Fight Club`,
        { signal },
      )
      expect(result).toHaveLength(5)
      expect(result).toEqual(movies.slice(0, 5).map(movieSummaryMapToDomain))
    })

    it('should return all results when less than 5 movies are found', async () => {
      const movies = [
        aMovieSummaryDto({ id: 550, title: 'Fight Club', overview: 'An insomniac office worker', vote_average: 8.4, release_date: '1999-10-15', poster_path: '/fightclub.jpg' }),
        aMovieSummaryDto({ id: 551, title: 'Fight Club 2', overview: 'Sequel to Fight Club', vote_average: 6.0, release_date: '2020-01-01', poster_path: '/fightclub2.jpg' }),
      ]

      const mockResponse = {
        data: aTrendingMoviesDto({ results: movies }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const signal = new AbortController().signal
      const result = await repository.searchMovies('Fight Club', signal, 5)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        `/search/movie?api_key=${TEST_API_KEY}&query=Fight Club`,
        { signal },
      )
      expect(result).toHaveLength(2)
      expect(result).toEqual(movies.map(movieSummaryMapToDomain))
    })
  })

  describe('getComingSoon', () => {
    it('should fetch upcoming movies from the correct endpoint', async () => {
      const movie = aMovieSummaryDto({
        id: 789,
        title: 'Avatar 3',
        overview: 'The next Avatar movie',
        vote_average: 0,
        release_date: '2025-12-19',
        poster_path: '/avatar3.jpg',
      })

      const mockResponse = {
        data: aTrendingMoviesDto({ results: [movie] }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getComingSoon()

      expect(mockApiClient.get).toHaveBeenCalledWith(`/movie/upcoming?api_key=${TEST_API_KEY}&language=en-US&page=1`)
      expect(result).toEqual([movieSummaryMapToDomain(movie)])
    })
  })

  describe('getMovieByGender', () => {
    it('should fetch movies by genre from the correct endpoint', async () => {
      const movies = [
        aMovieSummaryDto({ id: 101, title: 'Action Movie 1', overview: 'An action-packed film', vote_average: 7.2, release_date: '2023-05-15', poster_path: '/action1.jpg' }),
        aMovieSummaryDto({ id: 102, title: 'Action Movie 2', overview: 'Another action film', vote_average: 6.8, release_date: '2023-08-20', poster_path: '/action2.jpg' }),
      ]

      const mockResponse = {
        data: aTrendingMoviesDto({ results: movies }),
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieByGender('28') // Action genre ID

      expect(mockApiClient.get).toHaveBeenCalledWith(`/discover/movie?api_key=${TEST_API_KEY}&with_genres=28&language=es-ES&sort_by=popularity.desc&page=1`)
      expect(result).toEqual(movies.map(movieSummaryMapToDomain))
    })
  })

  describe('getPersonById', () => {
    it('should fetch person details from the correct endpoint', async () => {
      const personDto = aPersonDto()
      const mockResponse = {
        data: personDto,
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getPersonById('123')

      expect(mockApiClient.get).toHaveBeenCalledWith(`/person/123?api_key=${TEST_API_KEY}&language=en-US`)
      expect(result).toEqual(PersonMapToDomain(personDto))
    })
  })
})