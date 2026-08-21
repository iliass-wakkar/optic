'use client'

import Link from 'next/link'
import { Glasses, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react'

export function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#171615] text-stone-400 text-sm border-t border-stone-800">
      {/* Top Newsletter & Assurance Strip */}
      <div className="border-b border-stone-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <h3 className="font-serif text-xl font-normal text-stone-100 tracking-tight">
                Lettre d’Information de la Maison
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Recevez en avant-première nos arrivages de créateurs, éditions limitées et conseils d&apos;opticiens visagistes au Maroc.
              </p>
            </div>
            <div className="lg:col-span-6">
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-md lg:ml-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-stone-900/80 border border-stone-700/80 text-white placeholder-stone-500 text-xs focus:outline-none focus:ring-2 focus:ring-[#c5a880] focus:border-transparent transition"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#c5a880] hover:bg-[#b89a6f] text-stone-950 font-medium text-xs tracking-wide transition shrink-0 cursor-pointer"
                >
                  S&apos;inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Atelier */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center text-stone-200">
                <Glasses className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg font-normal text-white tracking-wider">
                MAISON D&apos;OPTIQUE
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Maison indépendante d&apos;optométrie et de haute lunetterie à Casablanca. Créations d&apos;exception, verres de haute précision et conseil morphologique sur-mesure.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#c5a880] font-medium pt-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Opticiens Diplômés • Agréé AMO &amp; Mutuelles Privées</span>
            </div>
          </div>

          {/* Col 2: Catalogue & Collections */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-200">
              Collections
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={"/catalogue?gender=men" as any} className="hover:text-white transition">
                  Montures Homme
                </Link>
              </li>
              <li>
                <Link href={"/catalogue?gender=women" as any} className="hover:text-white transition">
                  Montures Femme
                </Link>
              </li>
              <li>
                <Link href={"/catalogue?category=sunglasses" as any} className="hover:text-white transition">
                  Solaires de Créateur
                </Link>
              </li>
              <li>
                <Link href={"/catalogue?shape=pantos" as any} className="hover:text-white transition">
                  Formes Pantos &amp; Rétro
                </Link>
              </li>
              <li>
                <Link href={"/catalogue?material=titanium" as any} className="hover:text-white transition">
                  Éditions Titane Pur
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Savoir-faire */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-200">
              Savoir-Faire
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Bilan Visuel &amp; Réfraction
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  L&apos;Atelier de Montage Casablanca
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition">
                  Verres Progressifs Personnalisés
                </Link>
              </li>
              <li>
                <Link href="/#mutuelle" className="hover:text-white transition">
                  Prise en Charge AMO &amp; Mutuelles
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Notre Histoire &amp; Équipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique Casablanca */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-stone-200">
              Boutique Casablanca
            </p>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>74 Boulevard d&apos;Anfa, Gauthier<br />Casablanca (Angle Bd Moulay Youssef)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span className="text-stone-200 font-serif">05 22 20 40 60</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>Lun – Sam : 09h30 – 19h30<br />Dimanche fermé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="border-t border-stone-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} Maison d&apos;Optique Casablanca. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-stone-300 transition">
              Mentions Légales
            </Link>
            <Link href="/about" className="hover:text-stone-300 transition">
              Politique de Confidentialité
            </Link>
            <Link href="/.well-known/security.txt" className="hover:text-stone-300 transition">
              Security.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
