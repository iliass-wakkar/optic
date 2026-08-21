import Link from 'next/link'
import { ImportForm } from '@/features/products/components/ImportForm'
import { getTranslations } from 'next-intl/server'
import { Download, Upload, FileSpreadsheet } from 'lucide-react'

export default async function ImportExportPage() {
  const t = await getTranslations('csv')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-1">
          Synchronisation &amp; Données
        </p>
        <h1 className="text-3xl font-serif font-normal text-stone-900 tracking-tight">
          {t('importTitle')} &amp; {t('exportTitle')}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Exportez l&apos;inventaire de la Maison ou importez en masse des séries de montures au format CSV.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Export Card */}
        <section className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-stone-900">{t('exportTitle')}</h2>
              <p className="text-xs text-stone-400">Téléchargement du catalogue complet</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {t('exportDescription')} Génère un fichier CSV contenant les références, désignations, calibres, marques, catégories et prix publics.
          </p>

          <div className="pt-2">
            <Link
              href="/api/export/csv"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#c5a880]" />
              <span>{t('exportButton')}</span>
            </Link>
          </div>
        </section>

        {/* Import Card */}
        <section className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-stone-900">{t('importTitle')}</h2>
              <p className="text-xs text-stone-400">Ajout massif de montures</p>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {t('importDescription')}
          </p>

          <ImportForm />
        </section>
      </div>
    </div>
  )
}