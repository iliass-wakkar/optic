import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/features/products/components/ProductForm'
import { getTranslations } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const t = await getTranslations('admin.products')
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
          Atelier &amp; Création
        </p>
        <h1 className="text-3xl font-serif font-normal text-stone-900 tracking-tight mt-0.5">
          {t('newProduct')}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Enregistrez une nouvelle monture avec ses spécifications optiques et photographies.
        </p>
      </div>

      <ProductForm brands={brands} categories={categories} />
    </div>
  )
}