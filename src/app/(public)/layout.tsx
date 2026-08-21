import { getTranslations } from 'next-intl/server'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations('common')

  const navLabels = {
    home: t('home'),
    catalogue: t('catalogue'),
    about: t('about'),
    contact: t('contact'),
  }


  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-blue-100 selection:text-blue-900">
      <PublicHeader navLabels={navLabels} />
      <main className="flex-1 w-full">{children}</main>
      <PublicFooter />
    </div>
  )
}