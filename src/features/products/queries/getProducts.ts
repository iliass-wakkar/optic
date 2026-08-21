import { prisma } from '@/lib/prisma'
import type { Prisma, Gender, FrameType, Shape } from '@prisma/client'

export type ProductFilters = {
  q?: string
  brand?: string
  category?: string
  gender?: string
  frameType?: string
  shape?: string
  page?: number
  pageSize?: number
  sort?: string
}

const VALID_GENDERS: Record<string, Gender> = {
  men: 'MEN',
  women: 'WOMEN',
  unisex: 'UNISEX',
  kids: 'KIDS',
  MEN: 'MEN',
  WOMEN: 'WOMEN',
  UNISEX: 'UNISEX',
  KIDS: 'KIDS',
}

const VALID_FRAME_TYPES: Record<string, FrameType> = {
  full_rim: 'FULL_RIM',
  rimless: 'RIMLESS',
  semi_rimless: 'SEMI_RIMLESS',
  FULL_RIM: 'FULL_RIM',
  RIMLESS: 'RIMLESS',
  SEMI_RIMLESS: 'SEMI_RIMLESS',
}

const VALID_SHAPES: Record<string, Shape> = {
  rectangle: 'RECTANGLE',
  square: 'SQUARE',
  round: 'ROUND',
  oval: 'OVAL',
  'cat-eye': 'CAT_EYE',
  cat_eye: 'CAT_EYE',
  aviator: 'AVIATOR',
  browline: 'BROWLINE',
  RECTANGLE: 'RECTANGLE',
  SQUARE: 'SQUARE',
  ROUND: 'ROUND',
  OVAL: 'OVAL',
  CAT_EYE: 'CAT_EYE',
  AVIATOR: 'AVIATOR',
  BROWLINE: 'BROWLINE',
}

export async function getProducts(filters: ProductFilters) {
  const {
    q,
    brand,
    category,
    gender,
    frameType,
    shape,
    page = 1,
    pageSize = 12,
    sort = 'newest',
  } = filters

  const safePage = Math.max(1, Number(page) || 1)
  const safePageSize = Math.min(50, Math.max(1, Number(pageSize) || 12))

  const normalizedGender = gender ? VALID_GENDERS[gender] : undefined
  const normalizedFrameType = frameType ? VALID_FRAME_TYPES[frameType] : undefined
  const normalizedShape = shape ? VALID_SHAPES[shape] : undefined

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(q && {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { reference: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    }),
    ...(brand && { brandId: brand }),
    ...(category && { categoryId: category }),
    ...(normalizedGender && { gender: normalizedGender }),
    ...(normalizedFrameType && { frameType: normalizedFrameType }),
    ...(normalizedShape && { shape: normalizedShape }),
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' }
  switch (sort) {
    case 'price-asc':
      orderBy = { price: 'asc' }
      break
    case 'price-desc':
      orderBy = { price: 'desc' }
      break
    case 'name-asc':
      orderBy = { name: 'asc' }
      break
    case 'name-desc':
      orderBy = { name: 'desc' }
      break
    case 'newest':
    default:
      orderBy = { createdAt: 'desc' }
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1,
        },
      },
      orderBy,
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
    prisma.product.count({ where }),
  ])

  return { products, total, page: safePage, pageSize: safePageSize, totalPages: Math.ceil(total / safePageSize) }
}