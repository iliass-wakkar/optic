'use client'

import { useTranslations } from 'next-intl'

export default function Error({
  reset,
}: {
  reset: () => void
}) {
  const t = useTranslations('common')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{t('error')}</h2>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {t('confirm')}
      </button>
    </div>
  )
}