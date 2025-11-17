import type { MovieCredits } from '../../domain/MovieCredits'
import type { MovieCreditsDto } from '../_dto/MovieCreditsDto'

export const MovieCreditsMapper = {
  fromDto(dto: MovieCreditsDto): MovieCredits {
    const screenplay = dto.crew.find((member) => member.job === 'Screenplay')

    return {
      cast: dto.cast.slice(0, 6).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character ?? '',
        profilePath: actor.profile_path
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : null,
      })),
      screenplay: screenplay
        ? {
            id: screenplay.id,
            name: screenplay.name,
            job: screenplay.job,
            profilePath: screenplay.profile_path
              ? `https://image.tmdb.org/t/p/w500${screenplay.profile_path}`
              : null,
          }
        : null,
    }
  },
}
