import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Calendar } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-stone-800">
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-800 text-[#c5a880] text-xs font-mono font-medium uppercase tracking-wider border border-stone-700">
                <Calendar className="w-3.5 h-3.5" />
                <span>Prenez Rendez-Vous à Casablanca</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight leading-tight">
                Trouvez la Monture Parfaite pour Votre Visage.
              </h2>
              <p className="text-sm sm:text-base text-stone-400 max-w-2xl leading-relaxed">
                Nos opticiens visagistes vous accueillent pour un bilan visuel complet et des conseils personnalisés selon votre morphologie et vos besoins.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-stone-400 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c5a880]" />
                  <span>74 Boulevard d&apos;Anfa, Casablanca</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <span>05 22 20 40 60</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:items-end gap-4">
              <Link
                href="/catalogue"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#c5a880] hover:bg-[#b89a6f] text-stone-950 font-medium text-xs tracking-wide shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:ring-2 focus:ring-[#c5a880] focus:outline-none"
              >
                <span>Explorer le Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs border border-stone-700 transition-colors duration-200 focus:ring-2 focus:ring-stone-600 focus:outline-none"
              >
                <span>Nous contacter / Rendez-vous</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
