'use client'

import { useTranslations } from 'next-intl'
import { Trash2 } from 'lucide-react'

export function DeleteBrandButton({ id }: { id: string }) {
  const t = useTranslations('admin')
  return (
    <form
      action={async () => {
        if (confirm(t('confirmDelete'))) {
          await import('../actions/deleteBrand').then((m) => m.deleteBrand(id))
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium transition cursor-pointer"
        title={t('delete')}
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t('delete')}</span>
      </button>
    </form>
  )
}