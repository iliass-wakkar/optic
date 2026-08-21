import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Star, MapPin } from 'lucide-react'

export function StoreHero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf8] pt-12 pb-20 md:pt-20 md:pb-28 border-b border-stone-200/70">
      {/* Subtle warm ambient lighting */}
      <div
        className="absolute -top-24 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(212,190,152,0.35) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Brand Statement & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Eyebrow Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6] text-[#7a5c29] border border-[#e8ddc9] text-xs font-semibold tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#926c36]" />
                Bd d&apos;Anfa • Casablanca
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>4.9 / 5</span>
                <span className="text-stone-400">• Haute Lunetterie Maroc</span>
              </span>
            </div>

            {/* Main Luxury Serif Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
              L&apos;Art du Regard,{' '}
              <span className="italic font-normal text-stone-700">
                la précision du geste lunetier.
              </span>
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Maison d&apos;optique indépendante à Casablanca (Bd d&apos;Anfa). Nous sélectionnons des montures d&apos;exception façonnées au Japon, en France et en Italie, et montons vos verres avec une rigueur d&apos;orfèvre.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/catalogue"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-sm tracking-wide shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explorer la Collection</span>
                <ArrowRight className="w-4 h-4 text-stone-300" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-stone-100/70 text-stone-900 font-medium text-sm border border-stone-300 shadow-2xs transition-all duration-200"
              >
                <Calendar className="w-4 h-4 text-stone-500" />
                <span>Prendre Rendez-Vous en Boutique</span>
              </Link>
            </div>

            {/* Quick Filter Access */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className="text-stone-400 font-medium uppercase tracking-widest text-[11px] mr-1">
                Sélections :
              </span>
              <Link
                href={"/catalogue?gender=men" as any}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition"
              >
                Montures Homme
              </Link>
              <Link
                href={"/catalogue?gender=women" as any}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition"
              >
                Montures Femme
              </Link>
              <Link
                href={"/catalogue?category=sunglasses" as any}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition"
              >
                Solaires de Créateur
              </Link>
              <Link
                href={"/catalogue?shape=pantos" as any}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 transition"
              >
                Titane &amp; Pantos
              </Link>
            </div>
          </div>

          {/* Right Column: Lifestyle Portrait with Natural Light */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Lifestyle Image */}
              <div className="relative rounded-3xl overflow-hidden bg-stone-200 shadow-2xl aspect-[4/5] border border-stone-200/80">
                <Image
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&h=1125&fit=crop&auto=format&q=80"
                  alt="Portrait éditorial avec monture optique de créateur en lumière naturelle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />

                {/* Subtle dark bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                {/* Inset Boutique Note */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-stone-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-[#8c6b38]">
                        Atelier &amp; Showroom Casablanca
                      </p>
                      <p className="text-sm font-serif font-medium text-stone-900 mt-0.5">
                        Conseil morphologique &amp; Bilan visuel offert
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="px-3 py-1.5 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-medium transition shrink-0"
                    >
                      Boutique
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Quality Assurance Card */}
              <div className="absolute -top-4 -left-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f7f3eb] flex items-center justify-center text-[#8c6b38] font-serif font-bold text-lg">
                  MA
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Verres Haute Définition
                  </p>
                  <p className="text-xs text-stone-500">Centrage 3D &amp; Meulage sur place</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
