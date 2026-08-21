import { prisma } from '@/lib/prisma'

export async function getFilterOptions() {
  const [brands, categories] = await Promise.all([
    prisma.brand.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true },
    }),
  ])

  return { brands, categories }
}