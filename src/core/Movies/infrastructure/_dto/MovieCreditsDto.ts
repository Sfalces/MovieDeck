import { z } from 'zod'

export const CastMemberDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string().nullable().optional(),
  profile_path: z.string().nullable().optional(),
})

export const CrewMemberDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
  profile_path: z.string().nullable().optional(),
})

export const MovieCreditsDtoSchema = z.object({
  cast: z.array(CastMemberDtoSchema),
  crew: z.array(CrewMemberDtoSchema),
})

export type MovieCreditsDto = z.infer<typeof MovieCreditsDtoSchema>
