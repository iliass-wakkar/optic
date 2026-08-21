import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { EditProductForm } from '@/features/products/components/EditProductForm'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  })

  if (!product) {
    notFound()
  }

  const initialData = {
    ...product,
    description: product.description ?? undefined,
    price: product.price ? Number(product.price) : undefined,
    material: product.material ?? undefined,
    color: product.color ?? undefined,
    lensWidth: product.lensWidth ?? undefined,
    bridgeWidth: product.bridgeWidth ?? undefined,
    templeLength: product.templeLength ?? undefined,
    images: product.images,
  }

  const [brands, categories] = await Promise.all([
    prisma.brand.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.category.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
  ])

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l&apos;inventaire</span>
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38]">
          Fiche Monture
        </p>
        <h1 className="text-3xl font-serif font-normal text-stone-900 tracking-tight mt-0.5">
          {product.name}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Réf: <span className="font-mono text-stone-700">{product.reference}</span> • Modification des caractéristiques et visuels.
        </p>
      </div>

      <EditProductForm initialData={initialData} brands={brands} categories={categories} />
    </div>
  )
}