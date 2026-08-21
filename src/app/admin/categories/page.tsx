import { categoryService } from '@/features/categories/services/categoryService'
import { CategoryForm } from '@/features/categories/components/CategoryForm'
import { DeleteCategoryButton } from '@/features/categories/components/DeleteCategoryButton'
import { getTranslations } from 'next-intl/server'
import { FolderTree } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const t = await getTranslations('admin.categories')
  const categories = await categoryService.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-1">
          Segments du Catalogue
        </p>
        <h1 className="text-3xl font-serif font-normal text-stone-900 tracking-tight">
          {t('title')}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {categories.length} catégorie{categories.length > 1 ? 's' : ''} répertoriée{categories.length > 1 ? 's' : ''} (Optique, Solaires, Accessoires...).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create Category Form Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-stone-900">{t('createCategory')}</h2>
              <p className="text-xs text-stone-400">Nouveau segment</p>
            </div>
          </div>
          <CategoryForm />
        </div>

        {/* Right Column: Categories Table Card */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="font-serif text-lg text-stone-900">{t('list')}</h2>
              <p className="text-xs text-stone-400">Catégories actives du catalogue</p>
            </div>
            <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
              {categories.length} catégorie{categories.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 uppercase tracking-widest font-mono text-[10px]">
                  <th className="py-3 px-2">{t('name')}</th>
                  <th className="py-3 px-2">{t('slug')}</th>
                  <th className="py-3 px-2 text-right"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-3.5 px-2 font-medium text-stone-900">
                      {category.name}
                    </td>
                    <td className="py-3.5 px-2 font-mono text-stone-400">
                      {category.slug}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <DeleteCategoryButton id={category.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}