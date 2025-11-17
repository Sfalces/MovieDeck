import { z } from 'zod'

export const MovieDetailsDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  release_date: z.string(),
  poster_path: z.string().nullable(),
  tagline: z.string().nullable(),
  runtime: z.number().nullable(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
  budget: z.number().optional(),
  revenue: z.number().optional(),
})

export type MovieDetailsDto = z.infer<typeof MovieDetailsDtoSchema>
