import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations('common')
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">{t('loading')}</p>
    </div>
  )
}