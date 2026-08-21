import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { productService } from '@/features/products/services/productService'
import { productsToCsv } from '@/lib/csv'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const products = await productService.findMany({
    include: {
      brand: true,
      category: true,
      images: true,
    },
    orderBy: { reference: 'asc' },
  })

  const csv = productsToCsv(products)

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="produits.csv"',
    },
  })
}