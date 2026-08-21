import { describe, it, expect } from 'vitest'
import { categorySchema } from './categorySchema'

describe('categorySchema', () => {
  it('accepts a valid category', () => {
    const result = categorySchema.safeParse({ name: 'Optique', slug: 'optique' })
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = categorySchema.safeParse({ name: '', slug: 'optique' })
    expect(result.success).toBe(false)
  })

  it('rejects empty slug', () => {
    const result = categorySchema.safeParse({ name: 'Optique', slug: '' })
    expect(result.success).toBe(false)
  })

  it('rejects slug with uppercase', () => {
    const result = categorySchema.safeParse({ name: 'Optique', slug: 'Optique' })
    expect(result.success).toBe(false)
  })

  it('rejects slug with spaces', () => {
    const result = categorySchema.safeParse({ name: 'Optique', slug: 'op tique' })
    expect(result.success).toBe(false)
  })

  it('rejects slug with special characters', () => {
    const result = categorySchema.safeParse({ name: 'Optique', slug: 'op_tique!' })
    expect(result.success).toBe(false)
  })

  it('rejects overly long name', () => {
    const result = categorySchema.safeParse({ name: 'a'.repeat(256), slug: 'optique' })
    expect(result.success).toBe(false)
  })

  it('rejects overly long slug', () => {
    const result = categorySchema.safeParse({ name: 'Optique', slug: 'a'.repeat(256) })
    expect(result.success).toBe(false)
  })
})