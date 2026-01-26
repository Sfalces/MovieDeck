import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ApiClient } from '../../../Shared/domain/ApiClient'
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
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              title: 'Batman Begins',
              overview: 'A young Bruce Wayne becomes Batman',
              vote_average: 8.2,
              release_date: '2005-06-15',
              poster_path: '/poster1.jpg',
            },
            {
              id: 2,
              title: 'The Dark Knight',
              overview: 'Batman faces the Joker',
              vote_average: 9.0,
              release_date: '2008-07-18',
              poster_path: '/poster2.jpg',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getTrendingMovies()

      expect(mockApiClient.get).toHaveBeenCalledWith('/trending/movie/day?api_key=2082d84f7d00a2ccac896c85aa9f3adb')
      expect(result).toEqual([
        {
          id: '1',
          title: 'Batman Begins',
          overview: 'A young Bruce Wayne becomes Batman',
          vote: 8.2,
          releaseDate: '2005-06-15',
          poster: 'https://image.tmdb.org/t/p/w500/poster1.jpg',
        },
        {
          id: '2',
          title: 'The Dark Knight',
          overview: 'Batman faces the Joker',
          vote: 9.0,
          releaseDate: '2008-07-18',
          poster: 'https://image.tmdb.org/t/p/w500/poster2.jpg',
        },
      ])
    })
  })

  describe('getMovieById', () => {
    it('should fetch movie details by id from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          id: 123,
          title: 'Inception',
          overview: 'A mind-bending thriller',
          vote_average: 8.8,
          release_date: '2010-07-16',
          poster_path: '/inception.jpg',
          tagline: 'Your mind is the scene of the crime.',
          runtime: 148,
          genres: [
            { id: 28, name: 'Action' },
            { id: 878, name: 'Science Fiction' },
          ],
          budget: 160000000,
          revenue: 836836967,
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieById('123')

      expect(mockApiClient.get).toHaveBeenCalledWith('/movie/123?api_key=2082d84f7d00a2ccac896c85aa9f3adb&language=en-US')
      expect(result).toEqual({
        id: '123',
        title: 'Inception',
        overview: 'A mind-bending thriller',
        vote: 8.8,
        releaseDate: '2010-07-16',
        poster: 'https://image.tmdb.org/t/p/w500/inception.jpg',
        tagline: 'Your mind is the scene of the crime.',
        runtime: 148,
        genres: ['Action', 'Science Fiction'],
        budget: 160000000,
        revenue: 836836967,
      })
    })

    it('should handle null poster_path correctly', async () => {
      const mockResponse = {
        data: {
          id: 123,
          title: 'Test Movie',
          overview: 'Test overview',
          vote_average: 7.0,
          release_date: '2023-01-01',
          poster_path: null,
          tagline: null,
          runtime: null,
          genres: [],
        },
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
      const mockResponse = {
        data: {
          cast: [
            {
              id: 123,
              name: 'Leonardo DiCaprio',
              character: 'Dom Cobb',
              profile_path: '/leo.jpg',
            },
            {
              id: 456,
              name: 'Marion Cotillard',
              character: 'Mal Cobb',
              profile_path: '/marion.jpg',
            },
          ],
          crew: [
            {
              id: 789,
              name: 'Christopher Nolan',
              job: 'Director',
              profile_path: '/nolan.jpg',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieCredits('123')

      expect(mockApiClient.get).toHaveBeenCalledWith('/movie/123/credits?api_key=2082d84f7d00a2ccac896c85aa9f3adb&language=en-US')
      expect(result).toEqual({
        cast: [
          {
            id: 123,
            name: 'Leonardo DiCaprio',
            character: 'Dom Cobb',
            profilePath: 'https://image.tmdb.org/t/p/w500/leo.jpg',
          },
          {
            id: 456,
            name: 'Marion Cotillard',
            character: 'Mal Cobb',
            profilePath: 'https://image.tmdb.org/t/p/w500/marion.jpg',
          },
        ],
        screenplay: null,
      })
    })
  })

  describe('getMovieVideos', () => {
    it('should fetch movie videos from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          id: 123,
          results: [
            {
              id: 'video1',
              name: 'Official Trailer',
              type: 'Trailer',
              key: 'trailer-key',
              site: 'YouTube',
              size: 1080,
              official: true,
              published_at: '2020-07-15T00:00:00.000Z',
            },
            {
              id: 'video2',
              name: 'Teaser',
              type: 'Teaser',
              key: 'teaser-key',
              site: 'YouTube',
              size: 1080,
              official: false,
              published_at: '2020-06-15T00:00:00.000Z',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieVideos('123')

      expect(mockApiClient.get).toHaveBeenCalledWith('/movie/123/videos?api_key=2082d84f7d00a2ccac896c85aa9f3adb&language=en-US')
      expect(result).toEqual({
        videos: [
          {
            id: 'video1',
            name: 'Official Trailer',
            type: 'Trailer',
            url: 'https://www.youtube.com/watch?v=trailer-key',
          },
          {
            id: 'video2',
            name: 'Teaser',
            type: 'Teaser',
            url: 'https://www.youtube.com/watch?v=teaser-key',
          },
        ],
        trailer: {
          id: 'video1',
          name: 'Official Trailer',
          type: 'Trailer',
          url: 'https://www.youtube.com/watch?v=trailer-key',
        },
      })
    })
  })

  describe('getSimilarMovies', () => {
    it('should fetch similar movies from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 456,
              title: 'The Prestige',
              overview: 'Two magicians duel',
              vote_average: 8.5,
              release_date: '2006-10-20',
              poster_path: '/prestige.jpg',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getSimilarMovies('123')

      expect(mockApiClient.get).toHaveBeenCalledWith('/movie/123/similar?api_key=2082d84f7d00a2ccac896c85aa9f3adb&language=en-EU&page=1')
      expect(result).toEqual([
        {
          id: '456',
          title: 'The Prestige',
          overview: 'Two magicians duel',
          vote: 8.5,
          releaseDate: '2006-10-20',
          poster: 'https://image.tmdb.org/t/p/w500/prestige.jpg',
        },
      ])
    })
  })

  describe('getMovieByTitle', () => {
    it('should search movies by title from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 550,
              title: 'Fight Club',
              overview: 'An insomniac office worker',
              vote_average: 8.4,
              release_date: '1999-10-15',
              poster_path: '/fightclub.jpg',
            },
            {
              id: 551,
              title: 'Fight Club 2',
              overview: 'Sequel to Fight Club',
              vote_average: 6.0,
              release_date: '2020-01-01',
              poster_path: '/fightclub2.jpg',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieByTitle('Fight Club')

      expect(mockApiClient.get).toHaveBeenCalledWith('/search/movie?api_key=2082d84f7d00a2ccac896c85aa9f3adb&query=Fight Club')
      expect(result).toEqual({
        id: '550',
        title: 'Fight Club',
        overview: 'An insomniac office worker',
        vote: 8.4,
        releaseDate: '1999-10-15',
        poster: 'https://image.tmdb.org/t/p/w500/fightclub.jpg',
      })
    })
  })

  describe('getComingSoon', () => {
    it('should fetch upcoming movies from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 789,
              title: 'Avatar 3',
              overview: 'The next Avatar movie',
              vote_average: 0,
              release_date: '2025-12-19',
              poster_path: '/avatar3.jpg',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getComingSoon()

      expect(mockApiClient.get).toHaveBeenCalledWith('/movie/upcoming?api_key=2082d84f7d00a2ccac896c85aa9f3adb&language=en-US&page=1')
      expect(result).toEqual([
        {
          id: '789',
          title: 'Avatar 3',
          overview: 'The next Avatar movie',
          vote: 0,
          releaseDate: '2025-12-19',
          poster: 'https://image.tmdb.org/t/p/w500/avatar3.jpg',
        },
      ])
    })
  })

  describe('getMovieByGender', () => {
    it('should fetch movies by genre from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 101,
              title: 'Action Movie 1',
              overview: 'An action-packed film',
              vote_average: 7.2,
              release_date: '2023-05-15',
              poster_path: '/action1.jpg',
            },
            {
              id: 102,
              title: 'Action Movie 2',
              overview: 'Another action film',
              vote_average: 6.8,
              release_date: '2023-08-20',
              poster_path: '/action2.jpg',
            },
          ],
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getMovieByGender('28') // Action genre ID

      expect(mockApiClient.get).toHaveBeenCalledWith('/discover/movie?api_key=2082d84f7d00a2ccac896c85aa9f3adb&with_genres=28&language=es-ES&sort_by=popularity.desc&page=1')
      expect(result).toEqual([
        {
          id: '101',
          title: 'Action Movie 1',
          overview: 'An action-packed film',
          vote: 7.2,
          releaseDate: '2023-05-15',
          poster: 'https://image.tmdb.org/t/p/w500/action1.jpg',
        },
        {
          id: '102',
          title: 'Action Movie 2',
          overview: 'Another action film',
          vote: 6.8,
          releaseDate: '2023-08-20',
          poster: 'https://image.tmdb.org/t/p/w500/action2.jpg',
        },
      ])
    })
  })

  describe('getPersonById', () => {
    it('should fetch person details from the correct endpoint', async () => {
      const mockResponse = {
        data: {
          id: 123,
          name: 'Christopher Nolan',
          birthday: '1970-07-30',
          deathday: null,
          known_for_department: 'Directing',
          also_known_as: ['Chris Nolan'],
          gender: 2,
          biography: 'Christopher Nolan is a British-American film director...',
          place_of_birth: 'London, England, UK',
          profile_path: '/nolan-profile.jpg',
          adult: false,
          imdb_id: 'nm0634240',
          homepage: null,
          popularity: 8.5,
        },
      }

      mockApiClient.get.mockResolvedValue(mockResponse)

      const result = await repository.getPersonById('123')

      expect(mockApiClient.get).toHaveBeenCalledWith('/person/123?api_key=2082d84f7d00a2ccac896c85aa9f3adb&language=en-US')
      expect(result).toEqual({
        id: '123',
        name: 'Christopher Nolan',
        birthday: '1970-07-30',
        deathday: null,
        known_for_department: 'Directing',
        also_known_as: ['Chris Nolan'],
        gender: 2,
        biography: 'Christopher Nolan is a British-American film director...',
        place_of_birth: 'London, England, UK',
        profile_path: 'https://image.tmdb.org/t/p/w500/nolan-profile.jpg',
      })
    })
  })
})