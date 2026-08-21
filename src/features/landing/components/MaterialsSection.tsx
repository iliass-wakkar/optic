import Link from 'next/link'
import { Sparkles, Feather, Shield, Leaf, ArrowRight } from 'lucide-react'

export function MaterialsSection() {
  const materials = [
    {
      icon: Feather,
      title: 'Titane Japonais Pur',
      weight: 'Poids moyen : 12g',
      description:
        'Usiné avec une rigueur d’orfèvre dans la préfecture de Fukui. Légèreté absolue, mémoire de forme et hypoallergénie totale.',
      badge: 'Ultra-Léger',
    },
    {
      icon: Sparkles,
      title: 'Acétate Italien Mazzucchelli',
      weight: 'Fibre de coton biologique',
      description:
        'Façonné en Lombardie depuis 1849. Découpé dans la masse et poli au tonneau pendant 72 heures pour une brillance soyeuse.',
      badge: 'Artisanat d’Art',
    },
    {
      icon: Shield,
      title: 'Acier Chirurgical 316L',
      weight: 'Finesse & Résistance',
      description:
        'Profils ultra-fins et charnières sans vis brevetées garantissant une tenue mécanique inaltérable au fil des années.',
      badge: 'Haute Résistance',
    },
    {
      icon: Leaf,
      title: 'Bio-Acétate Éco-Conçu',
      weight: '100% Recyclable',
      description:
        'Formulé à partir de pulpe de bois et de graines de coton certifiées FSC pour des montures respectueuses de l’environnement.',
      badge: 'Éco-Responsable',
    },
  ]

  return (
    <section className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Matières d&apos;Exception
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            La Noblesse des Matériaux Lunetiers
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Une monture d&apos;exception commence par des matières premières pures sélectionnées auprès des ateliers les plus réputés au monde.
          </p>
        </div>

        {/* 4 Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {materials.map((m) => (
            <div
              key={m.title}
              className="p-6 sm:p-8 rounded-3xl bg-[#fcfbf9] border border-stone-200/80 hover:border-stone-300 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
                    <m.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600">
                    {m.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg text-stone-900 mb-1">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-[#8c6b38] mb-3">
                  {m.weight}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium tracking-wide shadow-xs transition"
          >
            <span>Explorer toutes les montures par matière</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
