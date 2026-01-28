import type { Movie } from 'core/Movies/domain/Movie'

export const aMovieDetails = (...options: Partial<Movie>[]): Movie => {
  const defaults: Movie = {
    id: '1',
    title: 'Batman Begins',
    overview: 'Bruce Wayne begins his journey to become Batman.',
    vote: 8,
    releaseDate: '2005-06-15',
    popularity: 7.9,
    poster: '/batman-begins.jpg',
    tagline: 'Evil fears the knight.',
    runtime: 140,
    genres: ['Action', 'Adventure', 'Crime'],
    budget: 150000000,
    revenue: 374218673,
  }

  return Object.assign({}, defaults, ...options)
}
