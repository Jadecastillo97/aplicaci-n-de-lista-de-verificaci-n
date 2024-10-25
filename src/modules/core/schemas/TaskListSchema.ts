import { z } from "zod"

export const TaskLisSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  date: z.string().optional(),
  status: z.boolean().optional(),
  location: z.string().optional(),
  coordinates: z.string().optional()
})
