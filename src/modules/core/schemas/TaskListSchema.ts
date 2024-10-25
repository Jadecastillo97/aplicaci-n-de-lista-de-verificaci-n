import { z } from "zod"

export const TaskLisSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  description: z.string().optional(),
  date: z.string().optional(),
  status: z.boolean().optional(),
  location: z.string().optional(),
  coordinates: z.string().optional()
})
