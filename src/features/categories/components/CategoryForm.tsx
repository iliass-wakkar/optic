'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorySchema, CategoryFormData } from '../schemas/categorySchema'
import { useTransition } from 'react'
import { createCategory } from '../actions/createCategory'
import { useTranslations } from 'next-intl'
import { Plus } from 'lucide-react'

export function CategoryForm() {
  const t = useTranslations('forms')
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', slug: '' },
  })

  const onSubmit = (data: CategoryFormData) => {
    startTransition(async () => {
      await createCategory(data)
      reset()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="category-name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          {t('name')} *
        </label>
        <input
          id="category-name"
          placeholder="ex: Lunettes de Sport"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'category-name-error' : undefined}
          className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition"
        />
        {errors.name && (
          <p id="category-name-error" role="alert" className="text-red-600 text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category-slug" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
          {t('slug')} *
        </label>
        <input
          id="category-slug"
          placeholder="ex: sport"
          {...register('slug')}
          aria-invalid={!!errors.slug}
          aria-describedby={errors.slug ? 'category-slug-error' : undefined}
          className="w-full px-4 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-[#8c6b38] focus:ring-2 focus:ring-[#8c6b38]/20 focus:outline-none transition font-mono"
        />
        {errors.slug && (
          <p id="category-slug-error" role="alert" className="text-red-600 text-xs mt-1">
            {errors.slug.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition disabled:opacity-50 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
        <span>{isPending ? t('creating') : t('create')}</span>
      </button>
    </form>
  )
}