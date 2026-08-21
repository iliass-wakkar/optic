import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProducts } from './getProducts'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}))

describe('getProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls findMany with default filters', async () => {
    const { prisma } = await import('@/lib/prisma')
    ;(prisma.product.findMany as any).mockResolvedValue([])
    ;(prisma.product.count as any).mockResolvedValue(0)

    const result = await getProducts({})
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isActive: true },
        skip: 0,
        take: 12,
      })
    )
    expect(result.page).toBe(1)
    expect(result.pageSize).toBe(12)
  })

  it('applies search q and filters', async () => {
    const { prisma } = await import('@/lib/prisma')
    ;(prisma.product.findMany as any).mockResolvedValue([])
    ;(prisma.product.count as any).mockResolvedValue(0)

    await getProducts({
      q: 'test',
      brand: 'brand1',
      gender: 'MEN',
      sort: 'price-asc',
      page: 2,
      pageSize: 5,
    })

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          isActive: true,
          OR: [
            { name: { contains: 'test', mode: 'insensitive' } },
            { reference: { contains: 'test', mode: 'insensitive' } },
            { description: { contains: 'test', mode: 'insensitive' } },
          ],
          brandId: 'brand1',
          gender: 'MEN',
        }),
        orderBy: { price: 'asc' },
        skip: 5,
        take: 5,
      })
    )
  })

  it('clamps page to minimum 1', async () => {
    const { prisma } = await import('@/lib/prisma')
    ;(prisma.product.findMany as any).mockResolvedValue([])
    ;(prisma.product.count as any).mockResolvedValue(0)
    await getProducts({ page: -5 })
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 0 })
    )
  })

  it('clamps pageSize to maximum 50', async () => {
    const { prisma } = await import('@/lib/prisma')
    ;(prisma.product.findMany as any).mockResolvedValue([])
    ;(prisma.product.count as any).mockResolvedValue(0)
    await getProducts({ pageSize: 100 })
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 50 })
    )
  })

  it('defaults to newest sort', async () => {
    const { prisma } = await import('@/lib/prisma')
    ;(prisma.product.findMany as any).mockResolvedValue([])
    ;(prisma.product.count as any).mockResolvedValue(0)
    await getProducts({})
    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: 'desc' } })
    )
  })
})