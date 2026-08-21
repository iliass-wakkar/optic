'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { UploadCloud } from 'lucide-react'

export function ImageUpload({
  onUpload,
}: {
  onUpload: (urls: string[]) => void
}) {
  const t = useTranslations('forms')
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    const uploadedUrls: string[] = []

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.url) {
          uploadedUrls.push(data.url)
        }
      } catch (err) {
        console.error('Upload error:', err)
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls])
    onUpload(uploadedUrls)
    setUploading(false)
  }

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl border-2 border-dashed border-stone-300 hover:border-stone-400 bg-[#fcfbf9] transition text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <label
              htmlFor="image-upload-input"
              className="text-xs font-semibold text-stone-800 hover:text-[#8c6b38] cursor-pointer"
            >
              <span>Sélectionner des photographies</span>
              <input
                id="image-upload-input"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                disabled={uploading}
                aria-label={t('images')}
                className="sr-only"
              />
            </label>
            <p className="text-[11px] text-stone-400 mt-0.5">
              JPG, PNG ou WebP jusqu&apos;à 5MB
            </p>
          </div>
        </div>
      </div>

      {uploading && (
        <p role="status" className="text-xs font-medium text-[#8c6b38] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#8c6b38] animate-ping" />
          <span>{t('uploading')}</span>
        </p>
      )}

      {images.length > 0 && (
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-2">
            Aperçus ({images.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div
                key={i}
                className="relative w-24 h-24 bg-stone-100 rounded-xl overflow-hidden border border-stone-200 shadow-2xs group"
              >
                <Image
                  src={url}
                  alt={`Aperçu image ${i + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}