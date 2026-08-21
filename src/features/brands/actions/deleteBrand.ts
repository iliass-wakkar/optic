'use server'

import { auth } from '@/lib/auth'
import { brandService } from '../services/brandService'
import { revalidatePath } from 'next/cache'

export async function deleteBrand(id: string) {
  const session = await auth()
  if (!session?.user) return { error: 'Non autorisé' }

  try {
    await brandService.delete(id)
    revalidatePath('/admin/brands')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la suppression' }
  }
}