import { describe, it, expect } from 'vitest'
import { productSchema } from './productSchema'

describe('productSchema', () => {
  const validProduct = {
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
    brandId: 'brand1',
    categoryId: 'cat1',
    isActive: true,
  }

  it('accepts a valid product', () => {
    const result = productSchema.safeParse(validProduct)
    expect(result.success).toBe(true)
  })

  it('rejects empty reference', () => {
    const result = productSchema.safeParse({ ...validProduct, reference: '' })
    expect(result.success).toBe(false)
  })

  it('rejects empty name', () => {
    const result = productSchema.safeParse({ ...validProduct, name: '' })
    expect(result.success).toBe(false)
  })

  it('rejects empty slug', () => {
    const result = productSchema.safeParse({ ...validProduct, slug: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid slug', () => {
    const result = productSchema.safeParse({ ...validProduct, slug: 'Invalid Slug!' })
    expect(result.success).toBe(false)
  })

  it('rejects negative price', () => {
    const result = productSchema.safeParse({ ...validProduct, price: '-10' })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric price', () => {
    const result = productSchema.safeParse({ ...validProduct, price: 'abc' })
    expect(result.success).toBe(false)
  })

  it('rejects lowercase gender', () => {
    const result = productSchema.safeParse({ ...validProduct, gender: 'men' })
    expect(result.success).toBe(false)
  })

  it('rejects lowercase frameType', () => {
    const result = productSchema.safeParse({ ...validProduct, frameType: 'full_rim' })
    expect(result.success).toBe(false)
  })

  it('rejects lowercase shape', () => {
    const result = productSchema.safeParse({ ...validProduct, shape: 'rectangle' })
    expect(result.success).toBe(false)
  })

  it('rejects non-numeric lensWidth', () => {
    const result = productSchema.safeParse({ ...validProduct, lensWidth: 'abc' })
    expect(result.success).toBe(false)
  })

  it('rejects negative lensWidth', () => {
    const result = productSchema.safeParse({ ...validProduct, lensWidth: '-5' })
    expect(result.success).toBe(false)
  })

  it('rejects missing brandId', () => {
    const result = productSchema.safeParse({ ...validProduct, brandId: '' })
    expect(result.success).toBe(false)
  })

  it('rejects missing categoryId', () => {
    const result = productSchema.safeParse({ ...validProduct, categoryId: '' })
    expect(result.success).toBe(false)
  })

  it('allows SQL injection in name (schema only checks format)', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      name: "'; DROP TABLE products;--",
    })
    expect(result.success).toBe(true)
  })

  it('rejects overly long name', () => {
    const result = productSchema.safeParse({ ...validProduct, name: 'a'.repeat(256) })
    expect(result.success).toBe(false)
  })

  it('rejects overly long reference', () => {
    const result = productSchema.safeParse({ ...validProduct, reference: 'a'.repeat(101) })
    expect(result.success).toBe(false)
  })

  it('rejects overly long description', () => {
    const result = productSchema.safeParse({ ...validProduct, description: 'a'.repeat(1001) })
    expect(result.success).toBe(false)
  })

  it('rejects Infinity price', () => {
    const result = productSchema.safeParse({ ...validProduct, price: Infinity })
    expect(result.success).toBe(false)
  })

  it('rejects NaN lensWidth', () => {
    const result = productSchema.safeParse({ ...validProduct, lensWidth: NaN })
    expect(result.success).toBe(false)
  })
})