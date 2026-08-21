import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function PromoBanner() {
  const promos = [
    {
      badge: 'Boutique & Atelier',
      title: 'Bilan Visuel Offert',
      subtitle: 'Contrôle complet de votre acuité visuelle sans frais à Casablanca.',
      tag: '100% Gratuit',
      href: '/contact',
      linkText: 'Prendre RDV',
    },
    {
      badge: 'Santé & Sérénité',
      title: 'AMO & Mutuelles',
      subtitle: 'Dossier de remboursement pré-rempli pour votre organisme d’assurance.',
      tag: 'Toutes Mutuelles Maroc',
      href: '/#mutuelle',
      linkText: 'En savoir plus',
    },
    {
      badge: 'Duo Privilège',
      title: '2ème Paire Offerte',
      subtitle: 'Pour tout équipement complet, bénéficiez d’une 2ème monture solaire ou repos.',
      tag: 'Offre d’Atelier',
      href: '/catalogue',
      linkText: 'En profiter',
    },
  ]

  return (
    <section className="py-12 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className="p-6 rounded-2xl bg-[#faf9f6] border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8c6b38]">
                    {promo.badge}
                  </span>
                  <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                    {promo.tag}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-1">
                  {promo.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {promo.subtitle}
                </p>
              </div>

              <Link
                href={promo.href as any}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 hover:text-[#8c6b38] transition group"
              >
                <span>{promo.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-stone-500" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
