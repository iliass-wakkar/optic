import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      update: vi.fn(),
      delete: vi.fn(),
      findFirst: vi.fn(),
      upsert: vi.fn(),
    },
    brand: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findFirst: vi.fn(),
    },
    category: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findFirst: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { updateProduct } from '@/features/products/actions/updateProduct'
import { deleteProduct } from '@/features/products/actions/deleteProduct'
import { importProducts } from '@/features/products/actions/importProducts'
import { createBrand } from '@/features/brands/actions/createBrand'
import { updateBrand } from '@/features/brands/actions/updateBrand'
import { deleteBrand } from '@/features/brands/actions/deleteBrand'
import { createCategory } from '@/features/categories/actions/createCategory'
import { updateCategory } from '@/features/categories/actions/updateCategory'
import { deleteCategory } from '@/features/categories/actions/deleteCategory'

describe('Fail-Closed Server Action Auth Guards (Negative Tests)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(auth as any).mockResolvedValue(null) // Unauthenticated
  })

  it('rejects updateProduct when unauthenticated', async () => {
    const result = await updateProduct('prod-1', {}, [])
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects deleteProduct when unauthenticated', async () => {
    const result = await deleteProduct('prod-1')
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects importProducts when unauthenticated', async () => {
    const formData = new FormData()
    const result = await importProducts(formData)
    expect(result.success).toBe(false)
    expect(result.errors).toEqual([{ row: 0, message: 'Non autorisé' }])
  })

  it('rejects createBrand when unauthenticated', async () => {
    const result = await createBrand({ name: 'Test', slug: 'test' })
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects updateBrand when unauthenticated', async () => {
    const result = await updateBrand('brand-1', { name: 'Test', slug: 'test' })
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects deleteBrand when unauthenticated', async () => {
    const result = await deleteBrand('brand-1')
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects createCategory when unauthenticated', async () => {
    const result = await createCategory({ name: 'Test', slug: 'test' })
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects updateCategory when unauthenticated', async () => {
    const result = await updateCategory('cat-1', { name: 'Test', slug: 'test' })
    expect(result).toEqual({ error: 'Non autorisé' })
  })

  it('rejects deleteCategory when unauthenticated', async () => {
    const result = await deleteCategory('cat-1')
    expect(result).toEqual({ error: 'Non autorisé' })
  })
})
