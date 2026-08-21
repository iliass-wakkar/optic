'use client'

import { useState, useTransition } from 'react'
import { importProducts } from '../actions/importProducts'
import { useTranslations } from 'next-intl'
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react'

export function ImportForm() {
  const t = useTranslations('csv')
  const [isPending, startTransition] = useTransition()
  const [fileName, setFileName] = useState<string>('')
  const [result, setResult] = useState<{
    importedCount: number
    errors: { row: number; message: string }[]
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setResult(null)

    startTransition(async () => {
      const res = await importProducts(formData)
      setResult(res)
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-6 rounded-2xl border-2 border-dashed border-stone-300 hover:border-stone-400 bg-[#fcfbf9] transition text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <label
                htmlFor="csv-file"
                className="text-xs font-semibold text-stone-800 hover:text-[#8c6b38] cursor-pointer"
              >
                <span>{fileName ? `Fichier choisi : ${fileName}` : 'Sélectionner un fichier CSV'}</span>
                <input
                  id="csv-file"
                  type="file"
                  name="file"
                  accept=".csv,text/csv"
                  required
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFileName(e.target.files[0].name)
                    }
                  }}
                  className="sr-only"
                />
              </label>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Format UTF-8 délimité par des virgules ou points-virgules
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition disabled:opacity-50 cursor-pointer"
        >
          <span>{isPending ? t('importing') : t('importButton')}</span>
        </button>
      </form>

      {result && (
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {t('result')}
            </h3>
          </div>
          <p role="status" className="text-xs text-stone-700">
            {t('importedCount', { count: result.importedCount })}, {t('errorsCount', { count: result.errors.length })}
          </p>
          {result.errors.length > 0 && (
            <div className="mt-3 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-1.5" role="alert">
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Erreurs lors de l&apos;importation :</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px]">
                {result.errors.map((err, idx) => (
                  <li key={idx}>
                    {t('row')} {err.row}: {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}