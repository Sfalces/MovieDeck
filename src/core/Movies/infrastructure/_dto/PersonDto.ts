import { z } from 'zod'

export const PersonDtoSchema = z.object({
  birthday: z.string().nullable(),
  known_for_department: z.string(),
  deathday: z.string().nullable(),
  id: z.number(),
  name: z.string(),
  also_known_as: z.array(z.string()),
  gender: z.number(),
  biography: z.string().nullable(),
  place_of_birth: z.string().nullable(),
  profile_path: z.string().nullable(),
  adult: z.boolean(),
  imdb_id: z.string().nullable(),
  homepage: z.string().nullable(),
  popularity: z.number(),
})


export type PersonDto = z.infer<typeof PersonDtoSchema>