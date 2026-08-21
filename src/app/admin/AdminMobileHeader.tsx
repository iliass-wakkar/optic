'use client'

import { useTranslations } from 'next-intl'
import { Glasses, Menu } from 'lucide-react'

export default function AdminMobileHeader({ onToggle }: { onToggle: () => void }) {
  const t = useTranslations('admin')

  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-[#171615] text-stone-100 border-b border-stone-800">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-[#c5a880]">
          <Glasses className="w-4 h-4" />
        </div>
        <div>
          <span className="font-serif text-sm font-normal tracking-wide block">
            MAISON D&apos;OPTIQUE
          </span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#c5a880]">
            {t('dashboard')}
          </span>
        </div>
      </div>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
        aria-label="Menu administration"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  )
}