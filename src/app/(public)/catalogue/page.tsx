import { getProducts } from '@/features/products/queries/getProducts'
import { ProductCard } from '@/features/products/components/ProductCard'
import { FilterSidebar } from '@/features/products/components/FilterSidebar'
import { Pagination } from '@/features/products/components/Pagination'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Catalogue de montures',
  description: 'Découvrez notre collection de montures optiques.',
}


type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CataloguePage({ searchParams }: Props) {
  const t = await getTranslations('catalog')
  const resolvedSearchParams = (await searchParams) || {}

  const params: Record<string, string | undefined> = {}

  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === 'string') params[key] = value
    else if (Array.isArray(value)) params[key] = value[0]
    else params[key] = undefined
  })


  const page = params.page ? parseInt(params.page, 10) : 1
  const pageSize = 12

  const { products, total, totalPages } = await getProducts({
    q: params.q,
    brand: params.brand,
    category: params.category,
    gender: params.gender,
    frameType: params.frameType,
    shape: params.shape,
    sort: params.sort,
    page: isNaN(page) ? 1 : page,
    pageSize,
  })

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-stone-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#8c6b38] mb-1.5 font-medium">
                <span>Haute Lunetterie</span>
                <span>•</span>
                <span>Collection 2026</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
                {t('title')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
                Découvrez notre collection complète de montures optiques et solaires de créateurs.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5efe4] border border-[#e5dac6] text-xs font-mono font-medium text-[#8c6b38] self-start sm:self-auto shadow-2xs">
              <span>{t('found', { count: total })}</span>
            </div>
          </div>
        </div>

        {/* Content with Sidebar and Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-72 shrink-0">
            <FilterSidebar currentParams={params} />
          </div>

          <div className="flex-1 w-full">
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white/90 rounded-2xl border border-stone-200/80 p-8 shadow-2xs">
                <p className="font-serif text-lg font-medium text-stone-800 mb-2">
                  {t('noProducts')}
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Essayez de modifier vos filtres ou effectuez une recherche plus large.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/catalogue"
              searchParams={params}
            />
          </div>
        </div>
      </div>
    </div>
  )
}