import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams: Record<string, string | undefined>
}

export async function Pagination({ currentPage, totalPages, basePath, searchParams }: PaginationProps) {
  const t = await getTranslations('common')

  if (totalPages <= 1) return null

  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) {
        params.set(key, value)
      }
    })
    params.set('page', String(page))
    return `${basePath}?${params.toString()}`
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-1.5 mt-10">
      {currentPage > 1 && (
        <Link
          href={buildUrl(currentPage - 1) as any}
          className="px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 hover:border-stone-400/80 text-stone-700 hover:text-stone-900 text-xs font-medium transition-all shadow-2xs focus:ring-2 focus:ring-stone-900 focus:outline-none"
        >
          {t('previous')}
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildUrl(page) as any}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`min-w-9 h-9 flex items-center justify-center rounded-xl text-xs font-mono transition-all focus:ring-2 focus:ring-stone-900 focus:outline-none ${
            page === currentPage
              ? 'bg-stone-900 text-stone-50 font-bold shadow-2xs'
              : 'bg-white border border-stone-200/80 hover:border-stone-400/80 text-stone-700 hover:text-stone-900 shadow-2xs'
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={buildUrl(currentPage + 1) as any}
          className="px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 hover:border-stone-400/80 text-stone-700 hover:text-stone-900 text-xs font-medium transition-all shadow-2xs focus:ring-2 focus:ring-stone-900 focus:outline-none"
        >
          {t('next')}
        </Link>
      )}
    </nav>
  )

}