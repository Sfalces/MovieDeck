import type { MovieVideos } from '../../domain/Movie'
import type { MovieVideosDto } from '../_dto/MovieTrailerDto'

export const MovieVideosMapper = {
  fromDto(dto: MovieVideosDto): MovieVideos {
    const videos = dto.results.map((video) => ({
      id: video.id,
      name: video.name,
      type: video.type,
      url:
        video.site === 'YouTube'
          ? `https://www.youtube.com/watch?v=${video.key}`
          : video.site === 'Vimeo'
            ? `https://vimeo.com/${video.key}`
            : '',
    }))

    // Tomamos el primer "Trailer" oficial si existe
    const trailer = videos.find((v) => v.type === 'Trailer') ?? null

    return { videos, trailer }
  },
}
