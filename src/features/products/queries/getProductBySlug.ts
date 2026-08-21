import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      brand: true,
      category: true,
      images: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  if (!product) notFound()

  return product
}