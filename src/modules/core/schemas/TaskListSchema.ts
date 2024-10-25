import { z } from "zod"

export const TaskLisSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre es requerido y debe tener al menos 3 caracteres."
    }),
  description: z.string().optional(),
  date: z.string().min(3).optional(),
  status: z.boolean().optional(),
  location: z.string().min(3).optional(),
  coordinates: z.string().min(3).optional()
})
