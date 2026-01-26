import type { MovieVideosDto } from '../_dto/MovieTrailerDto'

export const aMovieVideosDto = (...options: Partial<MovieVideosDto>[]): MovieVideosDto => {
  const defaults: MovieVideosDto = {
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
  }

  return Object.assign({}, defaults, ...options)
}
