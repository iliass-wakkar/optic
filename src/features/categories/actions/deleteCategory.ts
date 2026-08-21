'use server'

import { auth } from '@/lib/auth'
import { categoryService } from '../services/categoryService'
import { revalidatePath } from 'next/cache'

export async function deleteCategory(id: string) {
  const session = await auth()
  if (!session?.user) return { error: 'Non autorisé' }

  try {
    await categoryService.delete(id)
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la suppression' }
  }
}