import type { PersonDto } from '../_dto/PersonDto'

export const aPersonDto = (...options: Partial<PersonDto>[]): PersonDto => {
  const defaults: PersonDto = {
    id: 123,
    name: 'Christopher Nolan',
    birthday: '1970-07-30',
    deathday: null,
    known_for_department: 'Directing',
    also_known_as: ['Chris Nolan'],
    gender: 2,
    biography: 'Christopher Nolan is a British-American film director...',
    place_of_birth: 'London, England, UK',
    profile_path: '/nolan-profile.jpg',
    adult: false,
    imdb_id: 'nm0634240',
    homepage: null,
    popularity: 8.5,
  }

  return Object.assign({}, defaults, ...options)
}
