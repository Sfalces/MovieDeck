import type { Movie } from '../../domain/Movie'
import type { MovieDetailsDto } from '../_dto/MovieDto'
import type { MovieSummaryDto } from '../_dto/MovieSummary'

export const movieSummaryMapToDomain = (dto: MovieSummaryDto): Movie => ({
  id: String(dto.id),
  title: dto.title,
  overview: dto.overview,
  vote: dto.vote_average,
  releaseDate: dto.release_date,
  poster: dto.poster_path
    ? `https://image.tmdb.org/t/p/w500${dto.poster_path}`
    : '/placeholder.png',
})

export const movieDetailsMapToDomain = (dto: MovieDetailsDto): Movie => ({
  id: String(dto.id),
  title: dto.title,
  overview: dto.overview,
  vote: dto.vote_average,
  releaseDate: dto.release_date,
  poster: dto.poster_path
    ? `https://image.tmdb.org/t/p/w500${dto.poster_path}`
    : '/placeholder.png',
  tagline: dto.tagline ?? undefined,
  runtime: dto.runtime ?? undefined,
  genres: dto.genres?.map((g) => g.name) ?? [],
  budget: dto.budget ?? undefined,
  revenue: dto.revenue ?? undefined,
})
