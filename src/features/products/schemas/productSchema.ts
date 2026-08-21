import { z } from 'zod'

export const productSchema = z.object({
  reference: z.string().min(1, 'Référence requise').max(100, 'La référence est trop longue'),
  name: z.string().min(1, 'Nom requis').max(255, 'Le nom est trop long'),
  slug: z
    .string()
    .min(1)
    .max(255, 'Le slug est trop long')
    .regex(/^[a-z0-9-]+$/, 'Slug invalide'),
  description: z.string().max(1000, 'La description est trop longue').optional(),
  price: z.coerce.number().positive('Prix invalide').optional(),
  gender: z.enum(['MEN', 'WOMEN', 'UNISEX', 'KIDS']),
  frameType: z.enum(['FULL_RIM', 'RIMLESS', 'SEMI_RIMLESS']),
  shape: z.enum(['RECTANGLE', 'SQUARE', 'ROUND', 'OVAL', 'CAT_EYE', 'AVIATOR', 'BROWLINE']),
  material: z.string().max(100, 'Le matériau est trop long').optional(),
  color: z.string().max(100, 'La couleur est trop longue').optional(),
  lensWidth: z.coerce.number().int().positive().optional(),
  bridgeWidth: z.coerce.number().int().positive().optional(),
  templeLength: z.coerce.number().int().positive().optional(),
  brandId: z.string().min(1, 'Marque requise'),
  categoryId: z.string().min(1, 'Catégorie requise'),
  isActive: z.boolean().default(true),
})

export type ProductFormData = z.infer<typeof productSchema>