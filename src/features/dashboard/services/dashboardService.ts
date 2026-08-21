import { prisma } from '@/lib/prisma'

export interface DashboardStats {
  productCount: number
  brandCount: number
  categoryCount: number
  lastProduct: {
    id: string
    name: string
    reference: string
    price: number | null
    description: string | null
    createdAt: Date
  } | null
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const [productCount, brandCount, categoryCount, lastProduct] = await Promise.all([
      prisma.product.count(),
      prisma.brand.count(),
      prisma.category.count(),
      prisma.product.findFirst({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          reference: true,
          price: true,
          description: true,
          createdAt: true,
        },
      }),
    ])

    return {
      productCount,
      brandCount,
      categoryCount,
      lastProduct: lastProduct
        ? {
            ...lastProduct,
            price: lastProduct.price ? Number(lastProduct.price) : null,
          }
        : null,
    }
  },
}
