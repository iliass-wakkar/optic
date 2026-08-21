import Image from 'next/image'
import { Star } from 'lucide-react'

export function TestimonialsSection() {
  const reviews = [
    {
      author: 'Kenza B.',
      city: 'Casablanca (Gauthier)',
      model: 'Monture Pantos en Acétate Écaille',
      quote:
        'Un accueil rare et un conseil visagiste d’une grande finesse. J’hésitais depuis des mois et je suis repartie avec la monture parfaite pour mon visage.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format&q=80',
    },
    {
      author: 'Mehdi A.',
      city: 'Rabat (Agdal)',
      model: 'Monture Titane Pur Découpée',
      quote:
        'Verres progressifs taillés au millimètre dans leur atelier. Adaptation instantanée dès le premier jour et dossier mutuelle parfaitement géré.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80',
    },
    {
      author: 'Salma T.',
      city: 'Marrakech (Guéliz)',
      model: 'Solaire Aviateur Or Brossé',
      quote:
        'Une sélection de créateurs introuvable ailleurs au Maroc. La livraison express à Marrakech a été impeccable et le service après-vente est parfait.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&auto=format&q=80',
    },
  ]

  return (
    <section className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Témoignages &amp; Confiance
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Paroles de Clients
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-600">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-stone-900 ml-1">4.9 / 5</span>
            <span className="text-stone-400">• Plus de 15 000 regards accompagnés au Maroc</span>
          </div>
        </div>

        {/* 3 Editorial Review Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="block font-serif text-3xl text-stone-300 mb-4 select-none">
                  “
                </span>
                <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed mb-8">
                  {r.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center gap-3.5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                  <Image
                    src={r.avatar}
                    alt={r.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif text-sm font-medium text-stone-900">
                    {r.author}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {r.city} • <span className="text-[#8c6b38]">{r.model}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
