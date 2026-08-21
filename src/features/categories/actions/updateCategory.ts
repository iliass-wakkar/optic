'use server'

import { auth } from '@/lib/auth'
import { categorySchema } from '../schemas/categorySchema'
import { categoryService } from '../services/categoryService'
import { revalidatePath } from 'next/cache'

export async function updateCategory(id: string, input: unknown) {
  const session = await auth()
  if (!session?.user) return { error: 'Non autorisé' }

  const parsed = categorySchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    await categoryService.update(id, {
      name: parsed.data.name,
      slug: parsed.data.slug,
    })
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' }
  }
}