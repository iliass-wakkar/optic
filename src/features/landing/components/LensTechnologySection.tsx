import Link from 'next/link'
import { Eye, Shield, Sun, Monitor, ArrowRight, Check } from 'lucide-react'

export function LensTechnologySection() {
  const technologies = [
    {
      icon: Eye,
      title: 'Verres Progressifs Haute Définition',
      badge: 'Surfaçage Numérique',
      description:
        'Usinés point par point pour offrir des transitions d’une fluidité absolue entre vision de près, intermédiaire et de loin sans déformation latérale.',
      features: ['Adaptation instantanée', 'Large champ de vision panoramique', 'Verres de précision'],
    },
    {
      icon: Monitor,
      title: 'Filtre Protecteur Anti-Lumière Bleue',
      badge: 'Repos Oculaire',
      description:
        'Atténue sélectivement le spectre nocif émis par les écrans et l’éclairage LED pour apaiser la fatigue visuelle et prévenir les maux de tête.',
      features: ['Clarté cristalline sans reflet jaune', 'Idéal pour le travail sur écran', 'Traitement hydrophobe'],
    },
    {
      icon: Sun,
      title: 'Verres Photochromiques Intelligents',
      badge: 'Adaptation Lumineuse',
      description:
        'Verres nouvelle génération qui s’adaptent à l’ensoleillement marocain : parfaitement clairs en intérieur et foncés au soleil en moins de 30 secondes.',
      features: ['Protection 100% UVA/UVB', 'Transition douce et rapide', 'Polyvalence totale'],
    },
    {
      icon: Shield,
      title: 'Verres Polarisants Haute Précision',
      badge: 'Contraste Absolu',
      description:
        'Éliminent 99,9% des reflets parasites sur l’eau, le bitume ou les reflets urbains pour une vision nette, contrastée et un confort visuel d’exception.',
      features: ['Suppression de l’éblouissement', 'Couleurs naturelles', 'Recommandé pour la conduite'],
    },
  ]

  return (
    <section className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Haute Précision Optique
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            L&apos;Excellence de nos Verres de Précision
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Nous collaborons avec les plus grandes manufactures verrières internationales pour offrir une précision optique irréprochable adaptée à votre correction.
          </p>
        </div>

        {/* 4 Technologies Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {technologies.map((tech) => (
            <div
              key={tech.title}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5efe4] text-[#8c6b38] flex items-center justify-center">
                    <tech.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                    {tech.badge}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">
                  {tech.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {tech.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-100">
                {tech.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                    <Check className="w-3.5 h-3.5 text-[#8c6b38] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Treatment Strip */}
        <div className="p-8 rounded-3xl bg-stone-900 text-stone-100 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] mb-1">
                Traitements d&apos;Atelier Inclus
              </p>
              <h4 className="text-lg sm:text-xl font-serif">
                Antireflet multicouche • Anti-rayures renforcé • Hydrophobe • Anti-poussière
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Chaque paire de verres délivrée par notre atelier bénéficie des traitements protecteurs les plus durables.
              </p>
            </div>

            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#c5a880] hover:bg-[#b89a6f] text-stone-950 font-medium text-xs tracking-wide shadow-xs transition shrink-0"
            >
              <span>Choisir ma monture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
