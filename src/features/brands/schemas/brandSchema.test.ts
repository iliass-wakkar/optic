import { describe, it, expect } from 'vitest'
import { brandSchema } from './brandSchema'

describe('brandSchema', () => {
  it('accepts a valid brand', () => {
    const result = brandSchema.safeParse({ name: 'Ray-Ban', slug: 'ray-ban' })
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const result = brandSchema.safeParse({ name: '', slug: 'ray-ban' })
    expect(result.success).toBe(false)
  })

  it('rejects empty slug', () => {
    const result = brandSchema.safeParse({ name: 'Ray-Ban', slug: '' })
    expect(result.success).toBe(false)
  })

  it('rejects slug with uppercase', () => {
    const result = brandSchema.safeParse({ name: 'Ray-Ban', slug: 'Ray-Ban' })
    expect(result.success).toBe(false)
  })

  it('rejects slug with spaces', () => {
    const result = brandSchema.safeParse({ name: 'Ray-Ban', slug: 'ray ban' })
    expect(result.success).toBe(false)
  })

  it('rejects slug with special characters', () => {
    const result = brandSchema.safeParse({ name: 'Ray-Ban', slug: 'ray_ban!' })
    expect(result.success).toBe(false)
  })

  it('rejects overly long name', () => {
    const result = brandSchema.safeParse({ name: 'a'.repeat(256), slug: 'ray-ban' })
    expect(result.success).toBe(false)
  })

  it('rejects overly long slug', () => {
    const result = brandSchema.safeParse({ name: 'Ray-Ban', slug: 'a'.repeat(256) })
    expect(result.success).toBe(false)
  })
})