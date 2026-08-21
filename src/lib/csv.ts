import Papa from 'papaparse'
import type { Product, Brand, Category, ProductImage } from '@prisma/client'

export type ProductCsvRow = {
  reference: string
  name: string
  slug: string
  description: string
  price: string
  gender: string
  frameType: string
  shape: string
  material: string
  color: string
  lensWidth: string
  bridgeWidth: string
  templeLength: string
  brandName: string
  categoryName: string
  isActive: string
  images: string
}

export function productToCsvRow(
  product: Product & {
    brand: Brand
    category: Category
    images: ProductImage[]
  }
): ProductCsvRow {
  return {
    reference: product.reference,
    name: product.name,
    slug: product.slug,
    description: product.description ?? '',
    price: product.price !== null && product.price !== undefined ? product.price.toString() : '',
    gender: product.gender,
    frameType: product.frameType,
    shape: product.shape,
    material: product.material ?? '',
    color: product.color ?? '',
    lensWidth: product.lensWidth ? product.lensWidth.toString() : '',
    bridgeWidth: product.bridgeWidth ? product.bridgeWidth.toString() : '',
    templeLength: product.templeLength ? product.templeLength.toString() : '',
    brandName: product.brand.name,
    categoryName: product.category.name,
    isActive: product.isActive ? 'true' : 'false',
    images: product.images
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => img.url)
      .join('|'),
  }
}

export function productsToCsv(
  products: (Product & {
    brand: Brand
    category: Category
    images: ProductImage[]
  })[]
): string {
  const rows = products.map(productToCsvRow)
  return Papa.unparse(rows, {
    delimiter: ',',
    header: true,
  })
}

export type RawCsvRow = {
  reference: string
  name: string
  slug: string
  description?: string
  price?: string
  gender: string
  frameType: string
  shape: string
  material?: string
  color?: string
  lensWidth?: string
  bridgeWidth?: string
  templeLength?: string
  brandName: string
  categoryName: string
  isActive?: string
  images?: string
}

const REQUIRED_HEADERS = [
  'reference',
  'name',
  'slug',
  'description',
  'price',
  'gender',
  'frameType',
  'shape',
  'material',
  'color',
  'lensWidth',
  'bridgeWidth',
  'templeLength',
  'brandName',
  'categoryName',
  'isActive',
  'images',
]

export function parseProductsCsv(csvString: string): RawCsvRow[] {
  const cleaned = csvString.replace(/^\uFEFF/, '')
  const result = Papa.parse<RawCsvRow>(cleaned, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  })

  if (result.errors.length > 0) {
    throw new Error(`CSV parsing error: ${result.errors[0].message}`)
  }

  const headers = result.meta.fields?.map((h) => h.trim()) || []
  const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h))
  if (missing.length > 0) {
    throw new Error(`Colonnes manquantes: ${missing.join(', ')}`)
  }

  return result.data
}