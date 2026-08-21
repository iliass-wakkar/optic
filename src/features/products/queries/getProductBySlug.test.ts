import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProductBySlug } from './getProductBySlug'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findUnique: vi.fn(),
    },
  },
}))

describe('getProductBySlug', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns product with relations when slug exists', async () => {
    const { prisma } = await import('@/lib/prisma')
    const mockProduct = {
      id: '1',
      slug: 'test-product',
      name: 'Test',
      brand: { name: 'Brand' },
      category: { name: 'Category' },
      images: [],
    }
    ;(prisma.product.findUnique as any).mockResolvedValue(mockProduct)

    const result = await getProductBySlug('test-product')
    expect(result).toEqual(mockProduct)
    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { slug: 'test-product', isActive: true },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    })
  })

  it('throws notFound when slug does not exist', async () => {
    const { prisma } = await import('@/lib/prisma')
    ;(prisma.product.findUnique as any).mockResolvedValue(null)

    await expect(getProductBySlug('nonexistent')).rejects.toThrow()
  })
})