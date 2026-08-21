import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createProduct } from './createProduct'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      create: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

describe('createProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns error when not authenticated', async () => {
    ;(auth as any).mockResolvedValue(null)
    const result = await createProduct({}, [])
    expect(result.error).toBe('Non autorisé')
    expect(prisma.product.create).not.toHaveBeenCalled()
  })

  it('creates product with valid input and images', async () => {
    ;(auth as any).mockResolvedValue({ user: { id: 'admin' } })
    ;(prisma.product.create as any).mockResolvedValue({})

    const input = {
      reference: 'RB-001',
      name: 'Wayfarer',
      slug: 'wayfarer',
      description: 'Nice frame',
      price: '129.99',
      gender: 'UNISEX' as const,
      frameType: 'FULL_RIM' as const,
      shape: 'RECTANGLE' as const,
      material: 'Acétate',
      color: 'Noir',
      lensWidth: '50',
      bridgeWidth: '22',
      templeLength: '145',
      brandId: 'b1',
      categoryId: 'c1',
      isActive: true,
    }
    const imageUrls = ['/uploads/a.jpg']
    const result = await createProduct(input, imageUrls)
    expect(result.success).toBe(true)
    expect(prisma.product.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        reference: 'RB-001',
        name: 'Wayfarer',
        images: {
          create: [
            { url: '/uploads/a.jpg', alt: 'Wayfarer', sortOrder: 0 },
          ],
        },
      }),
    })
    expect(revalidatePath).toHaveBeenCalledWith('/admin/products')
  })

  it('returns field errors when validation fails', async () => {
    ;(auth as any).mockResolvedValue({ user: { id: 'admin' } })
    const result = await createProduct({ reference: '' }, [])
    expect(result.error).toBeDefined()
    expect(prisma.product.create).not.toHaveBeenCalled()
  })
})