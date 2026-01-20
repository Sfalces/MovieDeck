import type { MovieCredits } from 'core/Movies/domain/MovieCredits'

export const aMovieCredits = (...options: Partial<MovieCredits>[]): MovieCredits => {
  const defaults: MovieCredits = {
    cast: [
      {
        id: 101,
        name: 'Christian Bale',
        character: 'Bruce Wayne / Batman',
        profilePath: '/bale.jpg',
      },
      {
        id: 102,
        name: 'Michael Caine',
        character: 'Alfred Pennyworth',
        profilePath: '/caine.jpg',
      },
      {
        id: 103,
        name: 'Gary Oldman',
        character: 'James Gordon',
        profilePath: '/oldman.jpg',
      },
    ],
    screenplay: {
      id: 201,
      name: 'Christopher Nolan',
      job: 'Writer',
      profilePath: '/nolan.jpg',
    },
  }

  return Object.assign({}, defaults, ...options)
}
