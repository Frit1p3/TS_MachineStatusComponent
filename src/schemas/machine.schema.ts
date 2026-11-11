import { z } from 'zod'

export const machineSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().trim().min(1),
    status: z.enum(['running', 'stopped', 'maintenance', 'error']),
    temperatureC: z.number().finite(),
    currentPhase: z.number().int().positive(),
    totalPhases: z.number().int().positive(),
    elapsedMinutes: z.number().min(0).finite(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .superRefine((data, ctx) => {
    if (data.currentPhase > data.totalPhases) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'currentPhase cannot be greater than totalPhases',
        path: ['currentPhase'],
      })
    }
  })

export type Machine = z.infer<typeof machineSchema>
