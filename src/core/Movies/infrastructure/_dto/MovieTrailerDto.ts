import { z } from 'zod'

export const MovieVideosDtoSchema = z.object({
  id: z.number(),
  results: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      key: z.string(),
      site: z.string(),
      size: z.number(),
      type: z.string(),
      official: z.boolean().optional(),
      published_at: z.string().optional(),
    }),
  ),
})

export type MovieVideosDto = z.infer<typeof MovieVideosDtoSchema>
