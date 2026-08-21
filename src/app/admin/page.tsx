import Link from 'next/link'
import { dashboardService } from '@/features/dashboard/services/dashboardService'
import { getTranslations } from 'next-intl/server'
import {
  Glasses,
  Tag,
  FolderTree,
  Plus,
  ArrowRight,
  Sparkles,
  ArrowUpDown,
  Clock,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const t = await getTranslations('admin')
  const { productCount, brandCount, categoryCount, lastProduct } =
    await dashboardService.getStats()

  const stats = [
    {
      label: t('stats.totalProducts'),
      count: productCount,
      icon: Glasses,
      href: '/admin/products',
      subtext: 'Modèles répertoriés en boutique',
    },
    {
      label: t('stats.totalBrands'),
      count: brandCount,
      icon: Tag,
      href: '/admin/brands',
      subtext: 'Manufactures & créateurs indépendants',
    },
    {
      label: t('stats.totalCategories'),
      count: categoryCount,
      icon: FolderTree,
      href: '/admin/categories',
      subtext: 'Segments optiques & solaires',
    },
  ]

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-1">
            Espace Atelier &amp; Gestion
          </p>
          <h1 className="text-3xl font-serif font-normal text-stone-900 tracking-tight">
            {t('dashboard')}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Supervision du catalogue de montures, manufactures partenaires et inventaire.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
          >
            <Plus className="w-4 h-4 text-[#c5a880]" />
            <span>Nouvelle Monture</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href as any}
            className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-stone-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-stone-500">
                  {stat.label}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="font-serif text-3xl font-normal text-stone-900">
                {stat.count}
              </p>
              <p className="text-[11px] text-stone-400 mt-1">{stat.subtext}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-900 group-hover:text-[#8c6b38] transition-colors">
              <span>Gérer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* 2-Column: Quick Actions & Recent Product */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Quick Actions Card */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="font-serif text-lg text-stone-900">
              Actions Rapides
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Raccourcis pour la gestion quotidienne de la boutique.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href="/admin/products/new"
              className="p-4 rounded-2xl bg-[#fcfbf9] border border-stone-200/70 hover:border-stone-300 hover:bg-stone-50 transition flex items-center gap-3 text-xs font-medium text-stone-800"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-50 flex items-center justify-center shrink-0">
                <Plus className="w-4 h-4" />
              </div>
              <span>Ajouter une monture</span>
            </Link>

            <Link
              href="/admin/brands"
              className="p-4 rounded-2xl bg-[#fcfbf9] border border-stone-200/70 hover:border-stone-300 hover:bg-stone-50 transition flex items-center gap-3 text-xs font-medium text-stone-800"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <span>Gérer les créateurs</span>
            </Link>

            <Link
              href="/admin/import-export"
              className="p-4 rounded-2xl bg-[#fcfbf9] border border-stone-200/70 hover:border-stone-300 hover:bg-stone-50 transition flex items-center gap-3 text-xs font-medium text-stone-800"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center shrink-0">
                <ArrowUpDown className="w-4 h-4" />
              </div>
              <span>Import / Export CSV</span>
            </Link>

            <Link
              href="/catalogue"
              target="_blank"
              className="p-4 rounded-2xl bg-[#fcfbf9] border border-stone-200/70 hover:border-stone-300 hover:bg-stone-50 transition flex items-center gap-3 text-xs font-medium text-stone-800"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#8c6b38]" />
              </div>
              <span>Voir le catalogue public</span>
            </Link>
          </div>
        </div>

        {/* Last Added Product Spotlight */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-stone-900 text-stone-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Dernier Ajout à l&apos;Atelier</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
              Inventaire
            </span>
          </div>

          {lastProduct ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-[#c5a880] uppercase tracking-wider">
                  Réf: {lastProduct.reference}
                </span>
                <h3 className="text-2xl font-serif font-normal text-white mt-1">
                  {lastProduct.name}
                </h3>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                  {lastProduct.description || 'Monture enregistrée dans le catalogue.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-800 text-xs">
                <div>
                  <p className="text-stone-400">Prix public</p>
                  <p className="font-serif text-lg text-white font-medium">
                    {lastProduct.price ? `${Number(lastProduct.price).toLocaleString('fr-MA')} DH` : 'Sur devis'}
                  </p>
                </div>
                <Link
                  href={`/admin/products/${lastProduct.id}/edit` as any}
                  className="px-4 py-2 rounded-xl bg-[#c5a880] hover:bg-[#b89a6f] text-stone-950 font-medium text-xs transition"
                >
                  Modifier la fiche
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-400">
              Aucune monture enregistrée pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}