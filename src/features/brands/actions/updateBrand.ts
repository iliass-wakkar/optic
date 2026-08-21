'use server'

import { auth } from '@/lib/auth'
import { brandSchema } from '../schemas/brandSchema'
import { brandService } from '../services/brandService'
import { revalidatePath } from 'next/cache'

export async function updateBrand(id: string, input: unknown) {
  const session = await auth()
  if (!session?.user) return { error: 'Non autorisé' }

  const parsed = brandSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    await brandService.update(id, {
      name: parsed.data.name,
      slug: parsed.data.slug,
    })
    revalidatePath('/admin/brands')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' }
  }
}