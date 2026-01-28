import { z } from 'zod'

export const MovieSummaryDto = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  release_date: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
})

export type MovieSummaryDto = z.infer<typeof MovieSummaryDto>

export const TrendingMoviesDtoSchema = z.object({
  results: z.array(MovieSummaryDto),
})
export type TrendingMoviesDto = z.infer<typeof TrendingMoviesDtoSchema>
