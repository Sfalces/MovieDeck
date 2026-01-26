import type { MovieCreditsDto, CastMemberDto, CrewMemberDto } from '../_dto/MovieCreditsDto'

export const aCastMemberDto = (...options: Partial<CastMemberDto>[]): CastMemberDto => {
  const defaults: CastMemberDto = {
    id: 123,
    name: 'Leonardo DiCaprio',
    character: 'Dom Cobb',
    profile_path: '/leo.jpg',
  }

  return Object.assign({}, defaults, ...options)
}

export const aCrewMemberDto = (...options: Partial<CrewMemberDto>[]): CrewMemberDto => {
  const defaults: CrewMemberDto = {
    id: 789,
    name: 'Christopher Nolan',
    job: 'Director',
    profile_path: '/nolan.jpg',
  }

  return Object.assign({}, defaults, ...options)
}

export const aMovieCreditsDto = (...options: Partial<MovieCreditsDto>[]): MovieCreditsDto => {
  const defaults: MovieCreditsDto = {
    cast: [aCastMemberDto(), aCastMemberDto({ id: 456, name: 'Marion Cotillard', character: 'Mal Cobb', profile_path: '/marion.jpg' })],
    crew: [aCrewMemberDto()],
  }

  return Object.assign({}, defaults, ...options)
}
