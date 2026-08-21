'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductFormData } from '../schemas/productSchema'
import { updateProduct } from '../actions/updateProduct'
import { ImageUpload } from './ImageUpload'
import { useTransition, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Check } from 'lucide-react'

interface EditProductFormProps {
  initialData: Partial<ProductFormData> & { id: string; images?: { url: string }[] }
  brands: { id: string; name: string }[]
  categories: { id: string; name: string }[]
}

export function EditProductForm({ initialData, brands, categories }: EditProductFormProps) {
  const t = useTranslations('forms')
  const [isPending, startTransition] = useTransition()
  const [imageUrls, setImageUrls] = useState<string[]>(initialData.images?.map((img) => img.url) || [])
  const [submitResult, setSubmitResult] = useState<{ success: boolean; error?: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      reference: initialData.reference || '',
      name: initialData.name || '',
      slug: initialData.slug || '',
      description: initialData.description || '',
      price: initialData.price || undefined,
      gender: initialData.gender || ('UNISEX' as const),
      frameType: initialData.frameType || ('FULL_RIM' as const),
      shape: initialData.shape || ('RECTANGLE' as const),
      material: initialData.material || '',
      color: initialData.color || '',
      lensWidth: initialData.lensWidth || undefined,
      bridgeWidth: initialData.bridgeWidth || undefined,
      templeLength: initialData.templeLength || undefined,
      brandId: initialData.brandId || '',
      categoryId: initialData.categoryId || '',
      isActive: (initialData.isActive ?? true) as boolean,
    },
  })

  const onSubmit = (data: ProductFormData) => {
    setSubmitResult(null)
    startTransition(async () => {
      const res = await updateProduct(initialData.id, data, imageUrls)
      setSubmitResult(res as { success: boolean; error?: string })
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* 1. Identification & Pricing Card */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="font-serif text-lg text-stone-900">
            Identité de la Monture &amp; Tarification
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Désignation, référence d&apos;atelier et assignation de la Maison.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="prod-reference" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('reference')} *
            </label>
            <input
              id="prod-reference"
              {...register('reference')}
              aria-invalid={!!errors.reference}
              aria-describedby={errors.reference ? 'prod-reference-error' : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
            {errors.reference && (
              <p id="prod-reference-error" role="alert" className="text-red-600 text-xs mt-1">
                {errors.reference.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="prod-name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('name')} *
            </label>
            <input
              id="prod-name"
              {...register('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'prod-name-error' : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
            {errors.name && (
              <p id="prod-name-error" role="alert" className="text-red-600 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="prod-slug" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('slug')} *
            </label>
            <input
              id="prod-slug"
              {...register('slug')}
              aria-invalid={!!errors.slug}
              aria-describedby={errors.slug ? 'prod-slug-error' : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition font-mono"
            />
            {errors.slug && (
              <p id="prod-slug-error" role="alert" className="text-red-600 text-xs mt-1">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="prod-price" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('price')} (MAD / DH)
            </label>
            <input
              id="prod-price"
              type="number"
              step="0.01"
              {...register('price')}
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? 'prod-price-error' : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
            {errors.price && (
              <p id="prod-price-error" role="alert" className="text-red-600 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="prod-brandId" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('brand')} *
            </label>
            <select
              id="prod-brandId"
              {...register('brandId')}
              aria-invalid={!!errors.brandId}
              aria-describedby={errors.brandId ? 'prod-brandId-error' : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            >
              <option value="">{t('selectBrand')}</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brandId && (
              <p id="prod-brandId-error" role="alert" className="text-red-600 text-xs mt-1">
                {errors.brandId.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="prod-categoryId" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('category')} *
            </label>
            <select
              id="prod-categoryId"
              {...register('categoryId')}
              aria-invalid={!!errors.categoryId}
              aria-describedby={errors.categoryId ? 'prod-categoryId-error' : undefined}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            >
              <option value="">{t('selectCategory')}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p id="prod-categoryId-error" role="alert" className="text-red-600 text-xs mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            id="prod-isActive"
            type="checkbox"
            {...register('isActive')}
            className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-[#8c6b38]"
          />
          <label htmlFor="prod-isActive" className="text-xs font-medium text-stone-700 cursor-pointer">
            {t('active')} (Visible dans le catalogue public)
          </label>
        </div>
      </div>

      {/* 2. Morphologie & Dimensions Lunetières */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="font-serif text-lg text-stone-900">
            Morphologie &amp; Dimensions Lunetières
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Calibres et caractéristiques géométriques pour le conseil visagiste.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="prod-gender" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('gender')}
            </label>
            <select
              id="prod-gender"
              {...register('gender')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            >
              <option value="MEN">Homme</option>
              <option value="WOMEN">Femme</option>
              <option value="UNISEX">Unisexe</option>
              <option value="KIDS">Enfant</option>
            </select>
          </div>

          <div>
            <label htmlFor="prod-frameType" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('frameType')}
            </label>
            <select
              id="prod-frameType"
              {...register('frameType')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            >
              <option value="FULL_RIM">Cerclée</option>
              <option value="RIMLESS">Nylor / Percée</option>
              <option value="SEMI_RIMLESS">Demi-cerclée</option>
            </select>
          </div>

          <div>
            <label htmlFor="prod-shape" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('shape')}
            </label>
            <select
              id="prod-shape"
              {...register('shape')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            >
              <option value="RECTANGLE">Rectangle</option>
              <option value="SQUARE">Carrée</option>
              <option value="ROUND">Ronde</option>
              <option value="OVAL">Ovale</option>
              <option value="CAT_EYE">Cat Eye</option>
              <option value="AVIATOR">Aviator</option>
              <option value="BROWLINE">Browline</option>
            </select>
          </div>

          <div>
            <label htmlFor="prod-lensWidth" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('lensWidth')} (mm)
            </label>
            <input
              id="prod-lensWidth"
              type="number"
              {...register('lensWidth')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="prod-bridgeWidth" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('bridgeWidth')} (mm)
            </label>
            <input
              id="prod-bridgeWidth"
              type="number"
              {...register('bridgeWidth')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="prod-templeLength" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('templeLength')} (mm)
            </label>
            <input
              id="prod-templeLength"
              type="number"
              {...register('templeLength')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* 3. Matières & Description */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="font-serif text-lg text-stone-900">
            Matières, Coloris &amp; Description
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Détails artisanaux et récit pour la clientèle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="prod-material" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('material')}
            </label>
            <input
              id="prod-material"
              {...register('material')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="prod-color" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              {t('color')}
            </label>
            <input
              id="prod-color"
              {...register('color')}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="prod-description" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            {t('description')}
          </label>
          <textarea
            id="prod-description"
            rows={4}
            {...register('description')}
            className="w-full px-4 py-3 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition leading-relaxed"
          />
        </div>
      </div>

      {/* 4. Photographies */}
      <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="font-serif text-lg text-stone-900">
            Photographies de la Monture
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Vues de face, de profil et détails portés.
          </p>
        </div>

        <ImageUpload
          onUpload={(urls) => setImageUrls((prev) => [...prev, ...urls])}
        />
      </div>

      {/* Result feedback */}
      {submitResult?.error && (
        <div role="alert" className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {submitResult.error}
        </div>
      )}
      {submitResult?.success && (
        <div role="status" className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Monture mise à jour avec succès !</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition disabled:opacity-50 cursor-pointer"
        >
          <span>{isPending ? t('saving') || 'Enregistrement...' : t('save') || 'Enregistrer les modifications'}</span>
        </button>

        <Link
          href="/admin/products"
          className="px-6 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition"
        >
          Annuler
        </Link>
      </div>
    </form>
  )
}