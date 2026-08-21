'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { productSchema } from '../schemas/productSchema'
import { parseProductsCsv, RawCsvRow } from '@/lib/csv'
import { revalidatePath } from 'next/cache'

type ImportResult = {
  success: boolean
  importedCount: number
  errors: { row: number; message: string }[]
}

export async function importProducts(formData: FormData): Promise<ImportResult> {
  const session = await auth()
  if (!session?.user) {
    return { success: false, importedCount: 0, errors: [{ row: 0, message: 'Non autorisé' }] }
  }

  const file = formData.get('file') as File | null
  if (!file) {
    return { success: false, importedCount: 0, errors: [{ row: 0, message: 'Aucun fichier fourni' }] }
  }

  const csvString = await file.text()
  let rows: RawCsvRow[]
  try {
    rows = parseProductsCsv(csvString)
  } catch (error) {
    return {
      success: false,
      importedCount: 0,
      errors: [{ row: 0, message: error instanceof Error ? error.message : 'Erreur de lecture du CSV' }],
    }
  }

  const errors: { row: number; message: string }[] = []
  let importedCount = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const rowNumber = i + 2

    const brand = await prisma.brand.findFirst({
      where: { name: { equals: row.brandName, mode: 'insensitive' } },
    })
    if (!brand) {
      errors.push({ row: rowNumber, message: `Marque introuvable: ${row.brandName}` })
      continue
    }

    const category = await prisma.category.findFirst({
      where: { name: { equals: row.categoryName, mode: 'insensitive' } },
    })
    if (!category) {
      errors.push({ row: rowNumber, message: `Catégorie introuvable: ${row.categoryName}` })
      continue
    }

    const productInput = {
      reference: row.reference,
      name: row.name,
      slug: row.slug,
      description: row.description || undefined,
      price: row.price ? Number(row.price) : undefined,
      gender: row.gender,
      frameType: row.frameType,
      shape: row.shape,
      material: row.material || undefined,
      color: row.color || undefined,
      lensWidth: row.lensWidth ? Number(row.lensWidth) : undefined,
      bridgeWidth: row.bridgeWidth ? Number(row.bridgeWidth) : undefined,
      templeLength: row.templeLength ? Number(row.templeLength) : undefined,
      brandId: brand.id,
      categoryId: category.id,
      isActive: row.isActive ? row.isActive.toLowerCase() === 'true' : true,
    }

    const parsed = productSchema.safeParse(productInput)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]
      errors.push({
        row: rowNumber,
        message: `${firstError.path.join('.')}: ${firstError.message}`,
      })
      continue
    }

    const imageUrls = row.images
      ? row.images.split('|').map((url) => url.trim()).filter(Boolean)
      : []

    try {
      await prisma.product.upsert({
        where: { reference: row.reference },
        update: {
          ...parsed.data,
          images: {
            deleteMany: {},
            create: imageUrls.map((url, index) => ({
              url,
              alt: parsed.data.name,
              sortOrder: index,
            })),
          },
        },
        create: {
          ...parsed.data,
          images: {
            create: imageUrls.map((url, index) => ({
              url,
              alt: parsed.data.name,
              sortOrder: index,
            })),
          },
        },
      })
      importedCount++
    } catch (error) {
      errors.push({ row: rowNumber, message: 'Erreur lors de l’upsert' })
    }
  }

  revalidatePath('/admin/products')
  revalidatePath('/admin/import-export')

  return { success: errors.length === 0, importedCount, errors }
}