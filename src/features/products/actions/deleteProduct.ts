'use server'

import { auth } from '@/lib/auth'
import { productService } from '../services/productService'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(id: string) {
  const session = await auth()
  if (!session?.user) return { error: 'Non autorisé' }

  try {
    await productService.delete(id)
    revalidatePath('/admin/products')
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la suppression' }
  }
}