import Link from 'next/link'
import { getFilterOptions } from '../queries/getFilterOptions'
import { getTranslations } from 'next-intl/server'
import { SlidersHorizontal, Search, RotateCcw, ChevronDown, Check } from 'lucide-react'

type FilterSidebarProps = {
  currentParams: Record<string, string | undefined>
}

export async function FilterSidebar({ currentParams }: FilterSidebarProps) {
  const t = await getTranslations('catalog')
  const tCommon = await getTranslations('common')
  const { brands, categories } = await getFilterOptions()

  const genderOptions = [
    { value: 'MEN', label: 'Homme' },
    { value: 'WOMEN', label: 'Femme' },
    { value: 'UNISEX', label: 'Unisexe' },
    { value: 'KIDS', label: 'Enfant' },
  ]
  const frameTypeOptions = [
    { value: 'FULL_RIM', label: 'Cerclée' },
    { value: 'RIMLESS', label: 'Nylor / Percée' },
    { value: 'SEMI_RIMLESS', label: 'Demi-cerclée' },
  ]
  const shapeOptions = [
    { value: 'RECTANGLE', label: 'Rectangle' },
    { value: 'SQUARE', label: 'Carrée' },
    { value: 'ROUND', label: 'Ronde' },
    { value: 'OVAL', label: 'Ovale' },
    { value: 'CAT_EYE', label: 'Cat Eye' },
    { value: 'AVIATOR', label: 'Aviateur' },
    { value: 'BROWLINE', label: 'Browline' },
  ]

  const hasActiveFilters = Boolean(
    currentParams.q ||
    currentParams.brand ||
    currentParams.category ||
    currentParams.gender ||
    currentParams.frameType ||
    currentParams.shape ||
    (currentParams.sort && currentParams.sort !== 'newest')
  )

  return (
    <aside className="w-full bg-white/95 backdrop-blur-xs border border-stone-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#f5efe4] border border-[#e5dac6] flex items-center justify-center text-[#8c6b38]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-base text-stone-900 font-medium">Filtres</h2>
            <p className="text-[11px] text-stone-400 font-sans">Affinez votre sélection</p>
          </div>
        </div>

        {hasActiveFilters && (
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8c6b38] hover:text-stone-900 bg-[#faf9f6] px-2.5 py-1 rounded-full border border-[#e5dac6]/80 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{tCommon('reset')}</span>
          </Link>
        )}
      </div>

      <form method="GET" action="/catalogue" className="space-y-4">
        {/* Search Field */}
        <div>
          <label htmlFor="filter-q" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {tCommon('search')}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="filter-q"
              type="text"
              name="q"
              defaultValue={currentParams.q || ''}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[#faf9f6] border border-stone-200/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="filter-brand" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {t('brand')}
          </label>
          <div className="relative">
            <select
              id="filter-brand"
              name="brand"
              defaultValue={currentParams.brand || ''}
              className="appearance-none w-full bg-[#faf9f6] hover:bg-[#f5efe4]/30 border border-stone-200/80 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-stone-800 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <option value="">{t('allBrands')}</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="filter-category" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {t('category')}
          </label>
          <div className="relative">
            <select
              id="filter-category"
              name="category"
              defaultValue={currentParams.category || ''}
              className="appearance-none w-full bg-[#faf9f6] hover:bg-[#f5efe4]/30 border border-stone-200/80 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-stone-800 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <option value="">{t('allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="filter-gender" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {t('gender')}
          </label>
          <div className="relative">
            <select
              id="filter-gender"
              name="gender"
              defaultValue={currentParams.gender || ''}
              className="appearance-none w-full bg-[#faf9f6] hover:bg-[#f5efe4]/30 border border-stone-200/80 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-stone-800 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <option value="">{t('allGenders')}</option>
              {genderOptions.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Frame Type */}
        <div>
          <label htmlFor="filter-frameType" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {t('frameType')}
          </label>
          <div className="relative">
            <select
              id="filter-frameType"
              name="frameType"
              defaultValue={currentParams.frameType || ''}
              className="appearance-none w-full bg-[#faf9f6] hover:bg-[#f5efe4]/30 border border-stone-200/80 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-stone-800 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <option value="">{t('allFrameTypes')}</option>
              {frameTypeOptions.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Shape */}
        <div>
          <label htmlFor="filter-shape" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {t('shape')}
          </label>
          <div className="relative">
            <select
              id="filter-shape"
              name="shape"
              defaultValue={currentParams.shape || ''}
              className="appearance-none w-full bg-[#faf9f6] hover:bg-[#f5efe4]/30 border border-stone-200/80 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-stone-800 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <option value="">{t('allShapes')}</option>
              {shapeOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="filter-sort" className="block text-[11px] font-mono uppercase tracking-widest text-stone-500 font-medium mb-1.5">
            {t('sort')}
          </label>
          <div className="relative">
            <select
              id="filter-sort"
              name="sort"
              defaultValue={currentParams.sort || 'newest'}
              className="appearance-none w-full bg-[#faf9f6] hover:bg-[#f5efe4]/30 border border-stone-200/80 rounded-xl px-3.5 py-2.5 pr-8 text-xs text-stone-800 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/80 transition-all cursor-pointer shadow-2xs"
            >
              <option value="newest">{t('newest')}</option>
              <option value="price-asc">{t('priceAsc')}</option>
              <option value="price-desc">{t('priceDesc')}</option>
              <option value="name-asc">{t('nameAsc')}</option>
              <option value="name-desc">{t('nameDesc')}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {currentParams.page && <input type="hidden" name="page" value="1" />}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium py-2.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 tracking-wide focus:ring-2 focus:ring-stone-900 focus:outline-none cursor-pointer"
          >
            <span>{tCommon('apply')}</span>
          </button>

          {hasActiveFilters && (
            <Link
              href="/catalogue"
              className="w-full text-center text-xs font-medium text-stone-500 hover:text-stone-800 py-2 rounded-xl hover:bg-stone-100/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{tCommon('reset')}</span>
            </Link>
          )}
        </div>
      </form>
    </aside>
  )
}