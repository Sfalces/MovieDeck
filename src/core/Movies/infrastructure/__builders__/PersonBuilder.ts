import type { Person } from '../../domain/Movie'

export const aPerson = (...options: Partial<Person>[]): Person => {
  const defaults: Person = {
    id: '123',
    name: 'Christopher Nolan',
    birthday: '1970-07-30',
    deathday: null,
    known_for_department: 'Directing',
    also_known_as: ['Chris Nolan'],
    gender: 2,
    biography: 'Christopher Nolan is a British-American film director...',
    place_of_birth: 'London, England, UK',
    profile_path: 'https://image.tmdb.org/t/p/w500/nolan-profile.jpg',
  }

  return Object.assign({}, defaults, ...options)
}
