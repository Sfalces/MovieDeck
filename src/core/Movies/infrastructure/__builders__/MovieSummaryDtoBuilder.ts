import type { MovieSummaryDto, TrendingMoviesDto } from '../_dto/MovieSummary'

export const aMovieSummaryDto = (...options: Partial<MovieSummaryDto>[]): MovieSummaryDto => {
  const defaults: MovieSummaryDto = {
    id: 1,
    title: 'Batman Begins',
    overview: 'A young Bruce Wayne becomes Batman',
    vote_average: 8.2,
    release_date: '2005-06-15',
    popularity: 7.5,
    poster_path: '/poster1.jpg',
  }

  return Object.assign({}, defaults, ...options)
}

export const aTrendingMoviesDto = (
  ...options: Partial<{ results: MovieSummaryDto[] }>[]
): TrendingMoviesDto => {
  const defaults: TrendingMoviesDto = {
    results: [aMovieSummaryDto()],
  }

  return Object.assign({}, defaults, ...options)
}
