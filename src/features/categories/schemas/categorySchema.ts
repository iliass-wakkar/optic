import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(255, 'Le nom est trop long'),
  slug: z
    .string()
    .min(1)
    .max(255, 'Le slug est trop long')
    .regex(/^[a-z0-9-]+$/, 'Slug invalide (minuscules, chiffres, tirets)'),
})

export type CategoryFormData = z.infer<typeof categorySchema>