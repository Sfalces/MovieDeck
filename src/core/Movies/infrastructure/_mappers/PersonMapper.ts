import type { Person } from "core/Movies/domain/Movie";
import type { PersonDto } from "../_dto/PersonDto";

export const PersonMapToDomain = (dto: PersonDto): Person => ({
    id: String(dto.id),
    name: dto.name,
    birthday: dto.birthday,
    known_for_department: dto.known_for_department,
    deathday: dto.deathday,
    also_known_as: dto.also_known_as,
    gender: dto.gender,
    biography: dto.biography,
    place_of_birth: dto.place_of_birth,
    profile_path: dto.profile_path
      ? `https://image.tmdb.org/t/p/w500${dto.profile_path}`
      : null,
})