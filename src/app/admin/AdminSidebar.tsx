'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Glasses,
  LayoutDashboard,
  Tag,
  FolderTree,
  ArrowUpDown,
  ExternalLink,
  LogOut,
  Sparkles,
} from 'lucide-react'

type AdminSidebarProps = {
  onSignOut?: () => void
}

export default function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const pathname = usePathname()

  const navItems = [
    {
      href: '/admin',
      label: t('sidebar.dashboard'),
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/products',
      label: t('sidebar.products'),
      icon: Glasses,
      exact: false,
    },
    {
      href: '/admin/brands',
      label: t('sidebar.brands'),
      icon: Tag,
      exact: false,
    },
    {
      href: '/admin/categories',
      label: t('sidebar.categories'),
      icon: FolderTree,
      exact: false,
    },
    {
      href: '/admin/import-export',
      label: t('sidebar.importExport'),
      icon: ArrowUpDown,
      exact: false,
    },
  ]

  return (
    <aside className="w-72 bg-[#171615] text-stone-300 border-r border-stone-800 flex flex-col justify-between shrink-0 min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-stone-800/80">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-[#c5a880] shadow-sm">
              <Glasses className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-sm font-normal text-stone-100 tracking-wider block">
                MAISON D&apos;OPTIQUE
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880]">
                Administration
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          <p className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-stone-500">
            Gestion Catalogue
          </p>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(`${item.href}/`)

            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-stone-800 text-white font-semibold shadow-xs border border-stone-700/60'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#c5a880]' : 'text-stone-500'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Actions & User */}
      <div className="p-4 border-t border-stone-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-stone-400 hover:text-stone-100 hover:bg-stone-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Voir la Boutique</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
        </Link>

        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-stone-400 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{tCommon('logout')}</span>
          </button>
        )}
      </div>
    </aside>
  )
}