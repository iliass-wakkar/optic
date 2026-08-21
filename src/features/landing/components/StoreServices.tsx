import Link from 'next/link'
import { Eye, Sparkles, Wrench, ArrowRight, ShieldCheck } from 'lucide-react'

export function StoreServices() {
  const pillars = [
    {
      num: 'I',
      icon: Eye,
      title: 'L’Expertise Réfractive & Bilan Visuel',
      subtitle: 'Salle d’optométrie dédiée',
      description:
        'Nos opticiens diplômés réalisent une mesure complète de votre acuité visuelle avec des instruments de haute précision pour calibrer vos verres au quart de dioptrie.',
      perk: 'Bilan complet 100% offert & sans engagement',
    },
    {
      num: 'II',
      icon: Sparkles,
      title: 'Le Conseil Visagisme & Morphologie',
      subtitle: 'Accompagnement stylistique personnalisé',
      description:
        'Nous analysons la géométrie de vos traits, l’arcade sourcilière et vos teintes naturelles pour trouver la monture qui sublime votre personnalité.',
      perk: '+500 montures sélectionnées à essayer',
    },
    {
      num: 'III',
      icon: Wrench,
      title: 'L’Atelier de Meulage & Entretien à Vie',
      subtitle: 'Façonné dans notre atelier casablancais',
      description:
        'Chaque verre est taillé, centré et monté directement dans notre atelier à Casablanca. Nous assurons le réglage des branches, le changement des plaquettes et le nettoyage à vie.',
      perk: 'Montage express & Garantie 2 ans',
    },
  ]

  return (
    <section id="services" className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            L&apos;Esprit de la Maison
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Trois Piliers d&apos;Excellence pour Vos Yeux
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Une approche humaine et rigoureuse où santé visuelle, esthétique et confort ne font qu&apos;un.
          </p>
        </div>

        {/* 3 Pillars Grid with Generous Whitespace */}
        <div className="grid lg:grid-cols-3 gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 sm:p-10 rounded-3xl bg-[#fcfbf9] border border-stone-200/80 hover:border-stone-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif italic text-2xl text-stone-300">
                    {pillar.num}
                  </span>
                </div>

                <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
                  {pillar.subtitle}
                </p>
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-8">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200/60 flex items-center gap-2 text-xs font-medium text-[#7a5c29]">
                <ShieldCheck className="w-4 h-4 text-[#8c6b38] shrink-0" />
                <span>{pillar.perk}</span>
              </div>
            </div>
          ))}
        </div>

        {/* In-Store Invitation Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-800 hover:text-[#8c6b38] transition group"
          >
            <span>Prendre rendez-vous avec un opticien visagiste à Casablanca</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
