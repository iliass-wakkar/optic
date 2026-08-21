import Link from 'next/link'
import Image from 'next/image'
import { productService } from '@/features/products/services/productService'
import { DeleteProductButton } from '@/features/products/components/DeleteProductButton'
import { getTranslations } from 'next-intl/server'
import { Plus, Edit2, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const t = await getTranslations('admin.products')
  const products = await productService.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-1">
            Gestion du Stock &amp; Fiches Produits
          </p>
          <h1 className="text-3xl font-serif font-normal text-stone-900 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {products.length} monture{products.length > 1 ? 's' : ''} enregistrée{products.length > 1 ? 's' : ''} dans le catalogue de la Maison.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
        >
          <Plus className="w-4 h-4 text-[#c5a880]" />
          <span>{t('newProduct')}</span>
        </Link>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#fcfbf9] border-b border-stone-200/70 text-stone-500 uppercase tracking-widest font-mono text-[10px]">
                <th className="py-4 px-6">Monture</th>
                <th className="py-4 px-4">{t('reference')}</th>
                <th className="py-4 px-4">{t('brand')}</th>
                <th className="py-4 px-4">{t('category')}</th>
                <th className="py-4 px-4">{t('price')}</th>
                <th className="py-4 px-6 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => {
                const image = product.images?.[0]
                const formattedPrice = product.price
                  ? `${new Intl.NumberFormat('fr-MA').format(Number(product.price))} DH`
                  : 'Sur devis'

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-stone-50/60 transition-colors"
                  >
                    {/* Frame Name & Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-stone-100 border border-stone-200/60 overflow-hidden shrink-0">
                          {image ? (
                            <Image
                              src={image.url}
                              alt={image.alt || product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 text-[10px]">
                              —
                            </div>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/catalogue/${product.slug}`}
                            target="_blank"
                            className="font-serif text-sm font-medium text-stone-900 hover:text-[#8c6b38] transition flex items-center gap-1.5"
                          >
                            <span>{product.name}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400 opacity-0 group-hover:opacity-100" />
                          </Link>
                          <span className="text-[11px] text-stone-400">
                            {product.gender} • {product.shape}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Reference */}
                    <td className="py-4 px-4 font-mono text-stone-600">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200/60">
                        {product.reference}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="py-4 px-4">
                      <span className="font-medium text-stone-800">
                        {product.brand.name}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="text-stone-600">
                        {product.category.name}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <span className="font-serif font-medium text-stone-900">
                        {formattedPrice}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition"
                          title={t('edit')}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t('edit')}</span>
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}