import type { MovieDetailsDto } from '../_dto/MovieDto'

export const aMovieDetailsDto = (...options: Partial<MovieDetailsDto>[]): MovieDetailsDto => {
  const defaults: MovieDetailsDto = {
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
  }

  return Object.assign({}, defaults, ...options)
}
