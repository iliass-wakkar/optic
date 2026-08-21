import Link from 'next/link'
import { MapPin, Phone, Clock, Calendar, ShieldCheck, Car, Accessibility, ArrowRight } from 'lucide-react'

export function StoreLocationAndHours() {
  return (
    <section className="py-24 bg-[#faf9f6] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8c6b38] mb-3">
            Boutique &amp; Showroom Casablanca
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight mb-4">
            Venez Nous Rencontrer
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Idéalement située sur le Boulevard d&apos;Anfa, au cœur du quartier Gauthier à Casablanca, notre boutique vous accueille du lundi au samedi.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Store Information */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-8">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-stone-100 pb-6">
                <div>
                  <h3 className="font-serif text-2xl text-stone-900">Maison d&apos;Optique Casablanca</h3>
                  <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mt-1">
                    Atelier Lunetier &amp; Réfraction
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#f4efe6] text-[#7a5c29] text-xs font-medium">
                  Ouvert Aujourd&apos;hui
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-600">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-900 font-medium">
                    <MapPin className="w-4 h-4 text-[#8c6b38]" />
                    <span>Adresse</span>
                  </div>
                  <p className="text-stone-700">74 Boulevard d&apos;Anfa, Gauthier<br />Casablanca, Maroc</p>
                  <p className="text-[11px] text-stone-400">Angle Bd Moulay Youssef / Triangle d&apos;Or</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-900 font-medium">
                    <Clock className="w-4 h-4 text-[#8c6b38]" />
                    <span>Horaires</span>
                  </div>
                  <p className="text-stone-700">Lundi – Samedi : 09h30 – 19h30</p>
                  <p className="text-[11px] text-stone-400">Fermé le dimanche</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-900 font-medium">
                    <Phone className="w-4 h-4 text-[#8c6b38]" />
                    <span>Ligne Directe</span>
                  </div>
                  <p className="text-stone-900 font-serif text-base">05 22 20 40 60</p>
                  <p className="text-[11px] text-stone-400">WhatsApp Atelier : +212 6 61 00 00 00</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-stone-900 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#8c6b38]" />
                    <span>Prise en Charge</span>
                  </div>
                  <p className="text-stone-700">AMO &amp; Mutuelles Privées</p>
                  <p className="text-[11px] text-stone-400">Dossier de remboursement complet</p>
                </div>
              </div>
            </div>

            {/* In-Store Amenities */}
            <div className="pt-6 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-500">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50">
                <Accessibility className="w-3.5 h-3.5 text-stone-600" />
                Accès PMR
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50">
                <Car className="w-3.5 h-3.5 text-stone-600" />
                Parking Bd d&apos;Anfa &amp; Gauthier
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50">
                <Clock className="w-3.5 h-3.5 text-stone-600" />
                Meulage en atelier 1h
              </span>
            </div>
          </div>

          {/* Card 2: Appointment Card */}
          <div className="lg:col-span-5 p-8 sm:p-12 rounded-3xl bg-stone-900 text-stone-100 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#c5a880]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Rendez-Vous Personnalisé</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight leading-snug">
                Réservez Votre Bilan Visuel &amp; Essayage Privé
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Profitez d’un accueil privilégié avec notre opticien visagiste pour essayer nos montures de créateurs et contrôler votre acuité visuelle à Casablanca.
              </p>
            </div>

            <div className="space-y-3 pt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#c5a880] hover:bg-[#b89a6f] text-stone-950 font-medium text-xs tracking-wide shadow-md transition-all duration-200"
              >
                <span>Prendre Rendez-Vous en Ligne</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalogue"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 text-xs transition"
              >
                <span>Explorer le catalogue en ligne</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
