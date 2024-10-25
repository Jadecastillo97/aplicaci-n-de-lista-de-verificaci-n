import { z } from "zod"

export const TaskLisSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  date: z.string().min(3),
  status: z.boolean(),
  location: z.string().min(3),
  coordinates: z.string().min(3)
})
