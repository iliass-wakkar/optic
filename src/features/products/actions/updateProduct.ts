'use server'

import { auth } from '@/lib/auth'
import { productSchema } from '../schemas/productSchema'
import { productService } from '../services/productService'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function updateProduct(id: string, input: unknown, imageUrls: string[] = []) {
  const session = await auth()
  if (!session?.user) return { error: 'Non autorisé' }

  const parsed = productSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    const { brandId, categoryId, ...rest } = parsed.data
    const data: Prisma.ProductUpdateInput = {
      ...rest,
      brand: { connect: { id: brandId } },
      category: { connect: { id: categoryId } },
      images: {
        deleteMany: {},
        create: imageUrls.map((url, index) => ({
          url,
          alt: parsed.data.name,
          sortOrder: index,
        })),
      },
    }
    await productService.update(id, data)
    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${id}/edit`)
    return { success: true }
  } catch (error) {
    return { error: 'Erreur lors de la mise à jour' }
  }
}