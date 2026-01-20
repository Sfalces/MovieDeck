import type { MovieVideos } from 'core/Movies/domain/Movie'

export const aMovieVideos = (...options: Partial<MovieVideos>[]): MovieVideos => {
  const defaults: MovieVideos = {
    videos: [
      {
        id: 'yt1',
        name: 'Official Trailer',
        type: 'Trailer',
        url: 'https://youtube.com/watch?v=abc123',
      },
      {
        id: 'yt2',
        name: 'Behind the Scenes',
        type: 'Featurette',
        url: 'https://youtube.com/watch?v=def456',
      },
    ],
    trailer: {
      id: 'yt1',
      name: 'Official Trailer',
      type: 'Trailer',
      url: 'https://youtube.com/watch?v=abc123',
    },
  }

  return Object.assign({}, defaults, ...options)
}
