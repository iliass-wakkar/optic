import { vi } from 'vitest'

export function mockPrisma() {
  const mockProduct = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    upsert: vi.fn(),
  }

  const mockBrand = {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    count: vi.fn(),
  }

  const mockCategory = {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    count: vi.fn(),
  }

  vi.mock('@/lib/prisma', () => ({
    prisma: {
      product: mockProduct,
      brand: mockBrand,
      category: mockCategory,
      user: {
        findUnique: vi.fn(),
      },
    },
  }))

  return { mockProduct, mockBrand, mockCategory }
}