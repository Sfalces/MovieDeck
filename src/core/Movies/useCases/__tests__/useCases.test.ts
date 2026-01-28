import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { MoviesRepository } from '../../domain/MoviesRepository'
import { getTrendingMovies } from '../getTrendingMovies'
import { getMovieById } from '../getMovieById'
import { getMovieCredits } from '../getMovieCredits'
import { getMovieVideos } from '../getMovieVideos'
import { getSimilarMovies } from '../getSimilarMovies'
import { getMovieByTitle } from '../getMovieByTitle'
import { searchMovies } from '../searchMovies'
import { getComingSoon } from '../getComingSoon'
import { getMovieByGender } from '../getMovieByGender'
import { getPersonById } from '../getPersonById'
import { aMovieDetails } from '../../infrastructure/__builders__/MovieDetailsBuilder'
import { aMovieCredits } from '../../infrastructure/__builders__/MovieCreditsBuilder'
import { aMovieVideos } from '../../infrastructure/__builders__/MovieVideosBuilder'
import { aPerson } from '../../infrastructure/__builders__/PersonBuilder'

describe('Use Cases', () => {
  let mockRepository: MoviesRepository

  beforeEach(() => {
    vi.clearAllMocks()

    mockRepository = {
      getTrendingMovies: vi.fn(),
      getMovieById: vi.fn(),
      getMovieCredits: vi.fn(),
      getMovieVideos: vi.fn(),
      getSimilarMovies: vi.fn(),
      getMovieByTitle: vi.fn(),
      searchMovies: vi.fn(),
      getComingSoon: vi.fn(),
      getMovieByGender: vi.fn(),
      getPersonById: vi.fn(),
    }
  })

  describe('getTrendingMovies', () => {
    it('should call repository.getTrendingMovies and return the result', async () => {
      const expectedMovies = [aMovieDetails(), aMovieDetails({ id: '2', title: 'The Dark Knight' })]
      mockRepository.getTrendingMovies = vi.fn().mockResolvedValue(expectedMovies)

      const useCase = getTrendingMovies({ apiMoviesRepository: mockRepository })
      const result = await useCase()

      expect(mockRepository.getTrendingMovies).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expectedMovies)
    })
  })

  describe('getMovieById', () => {
    it('should call repository.getMovieById with the correct id and return the result', async () => {
      const expectedMovie = aMovieDetails({ id: '123', title: 'Inception' })
      mockRepository.getMovieById = vi.fn().mockResolvedValue(expectedMovie)

      const useCase = getMovieById({ apiMoviesRepository: mockRepository })
      const result = await useCase('123')

      expect(mockRepository.getMovieById).toHaveBeenCalledTimes(1)
      expect(mockRepository.getMovieById).toHaveBeenCalledWith('123')
      expect(result).toEqual(expectedMovie)
    })
  })

  describe('getMovieCredits', () => {
    it('should call repository.getMovieCredits with the correct id and return the result', async () => {
      const expectedCredits = aMovieCredits()
      mockRepository.getMovieCredits = vi.fn().mockResolvedValue(expectedCredits)

      const useCase = getMovieCredits({ apiMoviesRepository: mockRepository })
      const result = await useCase('123')

      expect(mockRepository.getMovieCredits).toHaveBeenCalledTimes(1)
      expect(mockRepository.getMovieCredits).toHaveBeenCalledWith('123')
      expect(result).toEqual(expectedCredits)
    })
  })

  describe('getMovieVideos', () => {
    it('should call repository.getMovieVideos with the correct id and return the result', async () => {
      const expectedVideos = aMovieVideos()
      mockRepository.getMovieVideos = vi.fn().mockResolvedValue(expectedVideos)

      const useCase = getMovieVideos({ apiMoviesRepository: mockRepository })
      const result = await useCase('123')

      expect(mockRepository.getMovieVideos).toHaveBeenCalledTimes(1)
      expect(mockRepository.getMovieVideos).toHaveBeenCalledWith('123')
      expect(result).toEqual(expectedVideos)
    })
  })

  describe('getSimilarMovies', () => {
    it('should call repository.getSimilarMovies with the correct id and return the result', async () => {
      const expectedMovies = [aMovieDetails({ id: '456', title: 'The Prestige' })]
      mockRepository.getSimilarMovies = vi.fn().mockResolvedValue(expectedMovies)

      const useCase = getSimilarMovies({ apiMoviesRepository: mockRepository })
      const result = await useCase('123')

      expect(mockRepository.getSimilarMovies).toHaveBeenCalledTimes(1)
      expect(mockRepository.getSimilarMovies).toHaveBeenCalledWith('123')
      expect(result).toEqual(expectedMovies)
    })
  })

  describe('getMovieByTitle', () => {
    it('should call repository.getMovieByTitle with the correct title and return the result', async () => {
      const expectedMovie = aMovieDetails({ id: '550', title: 'Fight Club' })
      mockRepository.getMovieByTitle = vi.fn().mockResolvedValue(expectedMovie)

      const useCase = getMovieByTitle({ apiMoviesRepository: mockRepository })
      const result = await useCase('Fight Club')

      expect(mockRepository.getMovieByTitle).toHaveBeenCalledTimes(1)
      expect(mockRepository.getMovieByTitle).toHaveBeenCalledWith('Fight Club')
      expect(result).toEqual(expectedMovie)
    })
  })

  describe('searchMovies', () => {
    it('should call repository.searchMovies with the correct query and return the result', async () => {
      const expectedMovies = [
        aMovieDetails({ id: '550', title: 'Fight Club' }),
        aMovieDetails({ id: '551', title: 'Fight Club 2' }),
        aMovieDetails({ id: '552', title: 'Fight Club 3' }),
      ]
      mockRepository.searchMovies = vi.fn().mockResolvedValue(expectedMovies)

      const useCase = searchMovies({ apiMoviesRepository: mockRepository })
      const signal = {} as AbortSignal
      const result = await useCase('Fight Club', signal, 20)

      expect(mockRepository.searchMovies).toHaveBeenCalledTimes(1)
      expect(mockRepository.searchMovies).toHaveBeenCalledWith('Fight Club', signal, 20)
      expect(result).toEqual(expectedMovies)
    })
  })

  describe('getComingSoon', () => {
    it('should call repository.getComingSoon and return the result', async () => {
      const expectedMovies = [aMovieDetails({ id: '789', title: 'Avatar 3' })]
      mockRepository.getComingSoon = vi.fn().mockResolvedValue(expectedMovies)

      const useCase = getComingSoon({ apiMoviesRepository: mockRepository })
      const result = await useCase()

      expect(mockRepository.getComingSoon).toHaveBeenCalledTimes(1)
      expect(result).toEqual(expectedMovies)
    })
  })

  describe('getMovieByGender', () => {
    it('should call repository.getMovieByGender with the correct genre and return the result', async () => {
      const expectedMovies = [
        aMovieDetails({ id: '101', title: 'Action Movie 1' }),
        aMovieDetails({ id: '102', title: 'Action Movie 2' }),
      ]
      mockRepository.getMovieByGender = vi.fn().mockResolvedValue(expectedMovies)

      const useCase = getMovieByGender({ apiMoviesRepository: mockRepository })
      const result = await useCase('28')

      expect(mockRepository.getMovieByGender).toHaveBeenCalledTimes(1)
      expect(mockRepository.getMovieByGender).toHaveBeenCalledWith('28')
      expect(result).toEqual(expectedMovies)
    })
  })

  describe('getPersonById', () => {
    it('should call repository.getPersonById with the correct id and return the result', async () => {
      const expectedPerson = aPerson({ id: '123', name: 'Christopher Nolan' })
      mockRepository.getPersonById = vi.fn().mockResolvedValue(expectedPerson)

      const useCase = getPersonById({ apiMoviesRepository: mockRepository })
      const result = await useCase('123')

      expect(mockRepository.getPersonById).toHaveBeenCalledTimes(1)
      expect(mockRepository.getPersonById).toHaveBeenCalledWith('123')
      expect(result).toEqual(expectedPerson)
    })
  })
})
